import * as HTMLParser from 'node-html-parser'
//const HTMLParser = require("node-html-parser")

export function findTermsInDoc(md: string){
//module.exports.findTermsInDoc = function (md: string) {
    const content = HTMLParser.parse(md)
    const termNodes = content.getElementsByTagName('term')
    const terms = termNodes
        .map(term => term.getAttribute('term'))
        .filter(term => !!term)
    return [...new Set(terms)]
}
