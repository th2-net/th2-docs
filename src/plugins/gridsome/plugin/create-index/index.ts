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
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const gitOpsPages: DocPageCollection = getCollection('GitOpsPage')
    const testingPages: DocPageCollection = getCollection('TestingPage')
    const explorePages: DocPageCollection = getCollection('ExplorePage')
    const modulePages: DocPageCollection = getCollection('ModulePage')

    const allPages = [
      ...gitOpsPages._collection.data, 
      ...testingPages._collection.data, 
      ...explorePages._collection.data, 
      ...modulePages._collection.data
    ]

    if (process.env.NODE_ENV === 'production')
      try {
        const algolia = algoliasearch(
          process.env.ALGOLIA_APP_ID ?? '',
          process.env.ALGOLIA_WRITE_API_KEY ?? ''
        )
        const index = algolia.initIndex('docs-module-design')
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