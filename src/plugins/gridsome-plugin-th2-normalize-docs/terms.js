const HTMLParser = require("node-html-parser")

module.exports.findTermsInDoc = function (md) {
    const content = HTMLParser.parse(md)
    const termNodes = content.getElementsByTagName('term')
    const terms = termNodes
        .map(term => term.getAttribute('term'))
        .filter(term => !!term)
    return [...new Set(terms)]
}
