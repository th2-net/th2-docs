import {findTermsInDoc} from './terms'
import {markdownToTxt} from 'markdown-to-txt'

module.exports = function (api: any) {
    // Update pages metadata
    api.onCreateNode((node: any) => {
        if (node.internal.typeName === 'DocPage') {
            node.terms = findTermsInDoc(node.content)
            const mdDescription = /^[\w\W]*<!--more-->/.exec(node.content)
            if (mdDescription)
                node.description = markdownToTxt(mdDescription[0])
            return node
        }
        if (node.internal.typeName === 'Term') {
            node.id = node.title
            return node
        }
    })
}
