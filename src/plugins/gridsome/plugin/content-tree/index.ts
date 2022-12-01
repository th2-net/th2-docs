import {savePagesTrees, getPagesData, constructPagesTree} from './pages-tree'
import {PageRaw, PageReduced, Th2Version} from "./types";
import {SectionsCollection} from "../../../types/gridsome/collections/sections";

module.exports = (api: any) => {
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const gitOpsPages = getPagesData(getCollection('GitOpsPage'))
    const testingPages = getPagesData(getCollection('TestingPage'))

    const sectionsCollection: SectionsCollection = addCollection('Section')
    sectionsCollection.addNode({
      id: 'deploy',
      title: 'Deploy',
      contentTreeJSON: JSON.stringify(constructPagesTree(gitOpsPages, 4))
    })
    sectionsCollection.addNode({
      id: 'test',
      title: 'Test',
      contentTreeJSON: JSON.stringify(constructPagesTree(testingPages, 4))
    })
    sectionsCollection.addNode({
      id: 'explore',
      title: 'Explore',
      contentTreeJSON: JSON.stringify(constructPagesTree([
        {path: '/explore/modules', title: 'Modules', weight: 0},
        {path: '/explore/dashboard', title: 'GitHub Dashboard', weight: 5},
      ]))
    })
  })
  // TODO: Delete old pages tree constructor
  api.loadSource(({ getCollection }: any) => {
      const docPages: PageReduced[] = getCollection('DocPage')
          ._collection.data
          .filter((page: PageRaw) => !page.path.startsWith('/versions') && !page.path.startsWith('/common'))
          .map((page: PageRaw) => {
              return {
                  title: page['tree-title'] || page.tree_title || page.title,
                  path: page.path,
                  weight: page.weight
              }
          })
      const readmePages: PageReduced[] = getCollection('ReadmePage')
          ._collection.data
          .filter((page: PageRaw) => !page.path.startsWith('/versions') && !page.path.startsWith('/common'))
          .map((page: PageRaw) => {
              return {
                  title: page['tree-title'] || page.tree_title || page.title,
                  path: page.path,
                  weight: page.weight
              }
          })
      const dashboardPages: PageReduced[] = [{
        path: '/fundamentals/th2-net-on-github/dashboard/',
        weight: 0,
        title: 'Dashboard'
      }]

      savePagesTrees([...docPages, ...readmePages, ...dashboardPages])
  })
}
