const VueRemark = require('@gridsome/vue-remark')
import * as fs from 'fs'
import {DocumentsCollection} from "../types/gridsome/collections/documents";
import {clearCache, readDoc, writeReadmeFile, getMarkdownFile} from "./utils";

module.exports = async function (api: any) {
  api.loadSource(async ({ getCollection, addCollection, store }: any) => {
    const docsCollection: DocumentsCollection = getCollection('DocPage')
    const docsToReplace = docsCollection._collection.data.filter(doc => !!doc.readme)
    console.log(docsToReplace)

    clearCache()

    for (let doc of docsToReplace){
      if (!doc.readme) continue
      const content = `${readDoc(doc.fileInfo.path)}\n${await getMarkdownFile(doc.readme)}`
      writeReadmeFile(doc.fileInfo.path, content)
    }

    new VueRemark(api, {
      ...VueRemark.defaultOptions(),
      typeName: 'ReadmePage',
      baseDir: './content/.cache/readmes',
      template: './src/templates/Documentation.vue',
      refs: {
        terms: {
          typeName: 'Term'
        }
      },
      index: ['_index', 'index'],
      remark: {
        autolinkHeadings: {
          content: {
            type: 'text',
            value: '#'
          }
        }
      },
      plugins: [
        require("@akebifiky/remark-simple-plantuml"),
        require('../remark-buetify-tables'),
        require('remark-prism'),
        require('remark-emoji'),
        require('../remark-copy-code-btn'),
      ],
    })
  })
}
