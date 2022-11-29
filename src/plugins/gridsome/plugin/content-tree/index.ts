import {savePagesTrees} from './pages-tree'
import {PageRaw, PageReduced, Th2Version} from "./types";

module.exports = (api: any) => {
    // Construct content trees
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
