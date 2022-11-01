const {savePagesTrees} = require("./pages-tree");
module.exports = function (api) {
    // Construct content trees
    api.loadSource(({ getCollection }) => {
        const docPages = getCollection('DocPage')
            ._collection.data
            .filter(page => !page.path.startsWith('/versions') && !page.path.startsWith('/common'))
            .map(page => {
                return {
                    title: page['tree-title'] || page.tree_title || page.title,
                    path: page.path,
                    weight: page.weight
                }
            })
        const dashboardPages = getCollection('Th2Version')
            ._collection.data
            .map(v => ({
                title: 'Dashboard',
                path: `/${v.folder}/boxes/dashboard/`,
                weight: -1000
            }))

        savePagesTrees([...docPages, ...dashboardPages])
    })
}
