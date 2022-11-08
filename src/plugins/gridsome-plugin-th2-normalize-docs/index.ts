import {findTermsInDoc} from './terms'
// const {findTermsInDoc} = require('./terms')

import {markdownToTxt} from 'markdown-to-txt'
//const { markdownToTxt } = require('markdown-to-txt')

import {getDocumentedTh2Versions} from './th2-versions'
//const {getDocumentedTh2Versions} = require("./th2-versions");

const versions = getDocumentedTh2Versions()

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

    // Move common pages to every version
    api.loadSource(({getCollection}: any) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        const docPages = getCollection('DocPage')
        for (const docPage of docPages._collection.data.filter((page: any) => page.path.startsWith('/versions'))) {
            docPage.internal.mimeType = 'text/markdown'
            docPage.internal.content = docPage.content
            if (process.env.NODE_ENV === 'production')
                docPages.removeNode(docPage.id)
            const path = docPage.path.replace('/versions', '')
            docPages.addNode({...docPage, path, id: path, $uid: path})
        }
        for (const docPage of docPages._collection.data.filter((page: any) => page.path.startsWith('/common'))) {
            docPage.internal.mimeType = 'text/markdown'
            docPage.internal.content = docPage.content
            if (process.env.NODE_ENV === 'production')
                docPages.removeNode(docPage.id)
            for (const version of versions){
                const path = docPage.path.replace('/common', `/${version}`)
                docPages.addNode({...docPage, path, id: path, $uid: path})
            }
        }
    })

    // Add th2 versions
    api.loadSource(({addCollection}:any) => {
        const versionsCollection = addCollection('Th2Version')
        for (const version of getDocumentedTh2Versions()){
            versionsCollection.addNode({ folder: version })
        }
    })
}
