const fs = require('fs')

type SitemapNode = {
    path:string,
    children?: SitemapNode[]
}

module.exports = function (api: any) {
    if (process.env.NODE_ENV === 'production') return
    const tree = require('../../../temp/pagesTrees.json')
    // List of all pages in development
    api.loadSource(() => {
        const sitemap: SitemapNode[] = []
        function getNodes(nodes: SitemapNode[] = []){
            for (let node of nodes){
                sitemap.push({
                    path: node.path
                })
                if (node.children?.length) {
                    getNodes(node.children)
                }
            }
        }
        getNodes(tree)
        fs.writeFileSync('static/sitemap.dev.json',
            JSON.stringify(sitemap, null, 2),
            {encoding:"utf-8"})
    })
}
