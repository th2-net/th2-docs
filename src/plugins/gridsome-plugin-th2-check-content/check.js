const { NodeToCheck } = require('./models')
const levenshtein = require('js-levenshtein')

const forbidden = process.env.FORBIDDEN.split(',').map(f => f.toLowerCase().trim())
const forbiddenSecret = process.env.FORBIDDEN_SECRET.split(',').map(f => f.toLowerCase().trim())

function checkNodeForWord({   node = new NodeToCheck({}),
                              forbiddenWord = '',
                              isSecret = false,
                              exactMatch = false}){
    const content = node.content
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
            if (isSecret)
                throw new Error(`Restricted content in ${node.nodeMeta.typeName} node ${node.nodeMeta.id} in ${node.fieldName}`)
            else {
                console.error('Words found: ', [word, twoWords, threeWords])
                throw new Error(`Restricted word "${forbiddenWord}" in ${node.nodeMeta.typeName} node ${node.nodeMeta.id} in ${node.fieldName}`)
            }
        }
    })
}

function checkNode( node = new NodeToCheck({})){
    forbidden.forEach(word => checkNodeForWord({ node, forbiddenWord: word}))
    forbiddenSecret.forEach(word => checkNodeForWord({ node, forbiddenWord: word, isSecret: true }))
    require('badwords-list').array.forEach(word => checkNodeForWord({ node, forbiddenWord: word, exactMatch: true }))
}

module.exports = {checkNode}
