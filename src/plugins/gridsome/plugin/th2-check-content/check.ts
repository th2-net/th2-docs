import {ContentToCheck, extractUrls} from './types'
import {getStringsFromObjectDeep} from './prepare'
import levenshtein from 'js-levenshtein'
import extractDomain from 'extract-domain'

const forbidden = process.env.FORBIDDEN?.split(',').map(f => f.toLowerCase().trim()) || []
const forbiddenSecret = process.env.FORBIDDEN_SECRET?.split(',').map(f => f.toLowerCase().trim()) || []
const forbiddenDomains = process.env.FORBIDDEN_DOMAINS?.split(',').map(f => f.toLowerCase().trim()) || []
const badwords: string[] = require('badwords-list').array

function throwError(message: string){
    if (process.env.NODE_ENV === 'production')
        throw new Error(message)
    else
        console.error(message)
}

type CheckNodeForWordInput = {
    node: ContentToCheck
    forbiddenWord: string
    isSecret?: boolean
    exactMatch?: boolean
}

function checkNodeForWord({   node,
                              forbiddenWord = '',
                              isSecret = false,
                              exactMatch = false}: CheckNodeForWordInput){
    try {
        checkStringForWord({string: node.content, forbiddenWord, exactMatch})
    }
    catch (e) {
        if (isSecret)
            throwError(`Restricted content in ${node.nodeMeta.typeName} node ${node.nodeMeta.id} in ${node.fieldName}`)
        else {
            throwError(`Restricted word "${forbiddenWord}" in ${node.nodeMeta.typeName} node ${node.nodeMeta.id} in ${node.fieldName}`)
        }
    }
}

function checkStringForWord({   string = '',
                              forbiddenWord = '',
                              exactMatch = false}){
    const content = string
      .toLowerCase()
      .replace(/[^A-Za-z\d \n\r]/g, '')
      .replace(/[\n\r]/g, ' ')
    const words = content.split(' ')
    words.forEach((word, index) => {
        const twoWords = index < words.length - 1 ? `${word} ${words[index + 1]}` : null
        const threeWords = index < words.length - 2 ? `${word} ${words[index + 1]} ${words[index + 2]}` : null
        const matchFromOneWord = 1 - levenshtein(forbiddenWord, word) / word.length
        const matchFromTwoWords = twoWords ? 1 - levenshtein(forbiddenWord, twoWords) / twoWords.length : 0
        const matchFromThreeWords = threeWords ? 1 - levenshtein(forbiddenWord, threeWords) / threeWords.length : 0

        if ([matchFromOneWord, matchFromTwoWords, matchFromThreeWords].some(match => exactMatch ? match === 1 : match > 0.8)) {
            throw new Error(`Restricted word "${forbiddenWord}".`)
        }
    })
}

export function checkContent(node: ContentToCheck){
    forbidden.forEach(word => checkNodeForWord({
        node,
        forbiddenWord: word
    }))
    forbiddenSecret.forEach(word => checkNodeForWord({
        node,
        forbiddenWord: word,
        isSecret: true
    }))
    badwords.forEach(word => checkNodeForWord({
        node,
        forbiddenWord: word,
        exactMatch: true
    }))
}

export function checkStringForUrls(string = '') {
    const links = extractUrls(string) || []
    for (let link of links){
        const domain = extractDomain(link).replace(/[()]/g, '')
        if (forbiddenDomains.includes(domain))
            throwError(`Restricted url: "${link}"`)
    }
}

export function checkObjectForUrls(object: Object) {
    const strings = getStringsFromObjectDeep(object)
    for (let string of strings) {
        checkStringForUrls(string)
    }
}
