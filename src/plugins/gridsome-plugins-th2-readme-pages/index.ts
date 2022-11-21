const VueRemark = require('@gridsome/vue-remark')
import {DocumentsCollection} from "../types/gridsome/collections/documents";

module.exports = async function (api: any) {
  api.loadSource(async ({ getCollection, addCollection, store }: any) => {
    const docsCollection: DocumentsCollection = getCollection('DocPage')
    const docsToReplace = docsCollection._collection.data.filter(doc => !!doc.readme)
    console.log(docsToReplace)

    new VueRemark(api, {
      ...VueRemark.defaultOptions(),
      typeName: 'ReadmePage', // Required
      baseDir: './content/.cache/readmes', // Where .md files are located
      template: './src/templates/Documentation.vue', // Optional
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
