import {GridsomeCollection, } from "../../../types/utils";
import {markdownToTxt} from 'markdown-to-txt'
import algoliasearch from "algoliasearch"

type DocPage = {
  path: string
  title: string
  content: string
}

type DocPageCollection = GridsomeCollection<DocPage>

module.exports = (api: any) => {
  api.loadSource(({ getCollection, addCollection }: any) => {
    // Get collections
    const readmePages: DocPageCollection = getCollection('ReadmePage')
    const docPages: DocPageCollection = getCollection('DocPage')

    const allPages = [
      ...docPages._collection.data
        .filter(page => !readmePages._collection.data.some(readme => readme.path === page.path)), 
      ...readmePages._collection.data
    ]

    //Save information
    if (process.env.NODE_ENV !== 'production')
      try {
        const algolia = algoliasearch(
          process.env.ALGOLIA_APP_ID ?? '',
          process.env.ALGOLIA_WRITE_API_KEY ?? ''
        )
        const index = algolia.initIndex('docs')
        index
          .saveObjects(allPages.map(page => ({
            objectID: page.path,
            title: page.title,
            path: page.path,
            content: markdownToTxt(page.content),
          })))
          .wait()
        index
          .setSettings({
            attributesToHighlight: ['title', 'content'],
            attributesToSnippet: ['content:20']
          })
          .wait()
      }
      catch(err){}
  })
}