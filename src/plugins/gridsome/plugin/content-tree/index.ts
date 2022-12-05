import {savePagesTrees, getPagesData, constructPagesTree, getFirstNonIndexPage} from './pages-tree'
import {PageRaw, PageReduced, Th2Version} from "./types";
import {SectionsCollection} from "../../../types/gridsome/collections/sections";
import {GridsomeCollection} from "../../../types/utils";

module.exports = (api: any) => {
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const gitOpsPages = getPagesData(getCollection('GitOpsPage'))
    const testingPages = getPagesData(getCollection('TestingPage'))

    const gitOpsTree = constructPagesTree(gitOpsPages, 4)
    const testingTree = constructPagesTree(testingPages, 4)
    const exploreTree = constructPagesTree([
      {path: '/explore/modules/', title: 'Modules', weight: 0},
      {path: '/explore/dashboard/', title: 'GitHub Dashboard', weight: 5}
    ], 4)

    const sectionsCollection: SectionsCollection = addCollection('Section')
    sectionsCollection.addNode({
      id: 'deploy',
      title: 'Deploy',
      basePath: '/deploy',
      firstPage: getFirstNonIndexPage(gitOpsTree).path,
      contentTreeJSON: JSON.stringify(gitOpsTree)
    })
    sectionsCollection.addNode({
      id: 'test',
      title: 'Test',
      basePath: '/test',
      firstPage: getFirstNonIndexPage(testingTree).path,
      contentTreeJSON: JSON.stringify(testingTree)
    })
    sectionsCollection.addNode({
      id: 'explore',
      title: 'Explore',
      basePath: '/explore',
      firstPage: getFirstNonIndexPage(exploreTree).path,
      contentTreeJSON: JSON.stringify(exploreTree)
    })
  })
  // Add module trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const modulesPages = getPagesData(getCollection('ModulePage'))
    const modulesTree = constructPagesTree(modulesPages, 5)
    const modulesCollection: GridsomeCollection<any> = getCollection('ModulePage')
    modulesCollection._collection.data.forEach(item => {
      item.contentTreeJSON = JSON.stringify(modulesTree.filter(m => item.path.startsWith(m.path)))
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
