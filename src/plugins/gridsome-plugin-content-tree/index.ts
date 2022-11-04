import {savePagesTrees} from './pages-tree'
import {PageRaw, PageReduced} from "./types";

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
        const dashboardPages: PageReduced[] = getCollection('Th2Version')
            ._collection.data
            // FIXME: specify type for version
            .map((version: any) => ({
                title: 'Dashboard',
                path: `/${version.folder}/fundamentals/th2-net-on-github/dashboard/`,
                weight: -1000
            }))

        savePagesTrees([...docPages, ...dashboardPages])
    })
}
