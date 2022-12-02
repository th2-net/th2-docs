import {findTermsInDoc} from './terms'
import {markdownToTxt} from 'markdown-to-txt'
const FilesystemSource = require('@gridsome/source-filesystem')

module.exports = function (api: any) {
    // Parse Terms definitions
    new FilesystemSource(api, {
        ...FilesystemSource.defaultOptions(),
        path: './content/terms/**/*.md',
        typeName: 'Term'
    })
    // Update pages metadata
    api.onCreateNode((node: any) => {
        if (['DocPage', 'GitOpsPage', 'TestingPage'].includes(node.internal.typeName)) {
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
