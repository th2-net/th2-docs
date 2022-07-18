const { ContentToCheck } = require('./models')
const { get, getStringsFromObjectDeep} = require('./prepare')
const levenshtein = require('js-levenshtein')
const extractUrls = require("extract-urls")
const extractDomain = require("extract-domain")

const forbidden = process.env.FORBIDDEN?.split(',').map(f => f.toLowerCase().trim()) || []
const forbiddenSecret = process.env.FORBIDDEN_SECRET?.split(',').map(f => f.toLowerCase().trim()) || []
const forbiddenDomains = process.env.FORBIDDEN_DOMAINS?.split(',').map(f => f.toLowerCase().trim()) || []

function throwError(message){
    if (process.env.NODE_ENV === 'production')
        throw new Error(message)
    else
        console.error(message)
}

function checkNodeForWord({   node = new ContentToCheck({}),
                              forbiddenWord = '',
                              isSecret = false,
                              exactMatch = false}){
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

function checkContent(node = new ContentToCheck({})){
    forbidden.forEach(word => checkNodeForWord({ node, forbiddenWord: word}))
    forbiddenSecret.forEach(word => checkNodeForWord({ node, forbiddenWord: word, isSecret: true }))
    require('badwords-list').array.forEach(word => checkNodeForWord({ node, forbiddenWord: word, exactMatch: true }))
}

function checkStringForUrls(string = '') {
    const links = extractUrls(string) || []
    for (let link of links){
        const domain = extractDomain(link).replace(/[()]/g, '')
        if (forbiddenDomains.includes(domain))
            throwError(`Restricted url: "${link}"`)
    }
}

function checkObjectForUrls(object) {
    const strings = getStringsFromObjectDeep(object)
    for (let string of strings) {
        checkStringForUrls(string)
    }
}

module.exports = {checkContent, checkObjectForUrls}
