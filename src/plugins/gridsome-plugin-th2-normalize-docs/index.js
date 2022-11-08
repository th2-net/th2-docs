"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terms_1 = require("./terms");
// const {findTermsInDoc} = require('./terms')
const markdown_to_txt_1 = require("markdown-to-txt");
//const { markdownToTxt } = require('markdown-to-txt')
const th2_versions_1 = require("./th2-versions");
//const {getDocumentedTh2Versions} = require("./th2-versions");
const versions = (0, th2_versions_1.getDocumentedTh2Versions)();
module.exports = function (api) {
    // Update pages metadata
    api.onCreateNode((node) => {
        if (node.internal.typeName === 'DocPage') {
            node.terms = (0, terms_1.findTermsInDoc)(node.content);
            const mdDescription = /^[\w\W]*<!--more-->/.exec(node.content);
            if (mdDescription)
                node.description = (0, markdown_to_txt_1.markdownToTxt)(mdDescription[0]);
            return node;
        }
        if (node.internal.typeName === 'Term') {
            node.id = node.title;
            return node;
        }
    });
    // Move common pages to every version
    api.loadSource(({ getCollection }) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        const docPages = getCollection('DocPage');
        for (const docPage of docPages._collection.data.filter((page) => page.path.startsWith('/versions'))) {
            docPage.internal.mimeType = 'text/markdown';
            docPage.internal.content = docPage.content;
            if (process.env.NODE_ENV === 'production')
                docPages.removeNode(docPage.id);
            const path = docPage.path.replace('/versions', '');
            docPages.addNode(Object.assign(Object.assign({}, docPage), { path, id: path, $uid: path }));
        }
        for (const docPage of docPages._collection.data.filter((page) => page.path.startsWith('/common'))) {
            docPage.internal.mimeType = 'text/markdown';
            docPage.internal.content = docPage.content;
            if (process.env.NODE_ENV === 'production')
                docPages.removeNode(docPage.id);
            for (const version of versions) {
                const path = docPage.path.replace('/common', `/${version}`);
                docPages.addNode(Object.assign(Object.assign({}, docPage), { path, id: path, $uid: path }));
            }
        }
    });
    // Add th2 versions
    api.loadSource(({ addCollection }) => {
        const versionsCollection = addCollection('Th2Version');
        for (const version of (0, th2_versions_1.getDocumentedTh2Versions)()) {
            versionsCollection.addNode({ folder: version });
        }
    });
};
