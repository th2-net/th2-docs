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
      {path: '/explore/dashboard/', title: 'GitHub dashboard', weight: 5}
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
    const modulesTree = constructPagesTree(modulesPages, 4)
    const modulesCollection: GridsomeCollection<any> = getCollection('ModulePage')
    modulesCollection._collection.data.forEach(item => {
      const tree = modulesTree.filter(m => item.path.startsWith(m.path))
      item.meta = {
        contentTreeJSON: JSON.stringify(tree),
        module_name: tree[0].title,
        main_path: tree[0].path
      }
    })

    api.onCreateNode((node: any) => {
      if (['ModulePage'].includes(node.internal.typeName)) {
        const tree = modulesTree.filter(m => node.path.startsWith(m.path))
        node.meta = {
          contentTreeJSON: JSON.stringify(tree),
          module_name: tree[0].title,
          main_path: tree[0].path
        }
      }
    })
  })
}
