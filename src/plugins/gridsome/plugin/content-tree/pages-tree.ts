import * as fs from 'fs'
import {PageRaw, PageReduced, TreeNode} from "./types";
import {GridsomeCollection} from "../../../types/utils";

export function getFirstNonIndexPage(tree: TreeNode[]): TreeNode{
    if (tree.length === 0)
        throw new Error('Tree should contain ar least 1 item')
    if (tree[0].children.length === 0)
        return tree[0]
    else return getFirstNonIndexPage(tree[0].children)
}
export function getPagesData(collection: GridsomeCollection<PageRaw>): PageReduced[]{
    return collection
        ._collection.data
        .map((page: PageRaw) => {
              return {
                  title: page['tree-title'] || page.tree_title || page.title,
                  path: page.path,
                  weight: page.weight ?? -100
              }
        })
}

export function constructPagesTree(pages: PageReduced[], highestLevel: number = 3): TreeNode[]{
    const processedPages: TreeNode[] = pages
        .map(page => ({...page, followPath: '', children: []}))
        .sort((a, b) => {
            if ((a?.weight || -100) < (b?.weight || -100)) return -1
            if ((a?.weight || -100) > (b?.weight || -100)) return 1
            return 0
        })
    // Higher level pages
    let sections = processedPages.filter(page => {
        const pathFolders = page.path.split('/')
        return pathFolders.length === highestLevel
    })
    function buildNextLevel(allPages: TreeNode[], higherSections: TreeNode[], level = 1){
        // Find all lower level pages
        let lowerSections = allPages.filter(page => {
            const pathFolders = page.path.split('/')
            return pathFolders.length === (level + 1)
        })
        // Check if lower level pages exist
        if (lowerSections.length === 0)
            return;
        // Bind children pages
        higherSections.forEach(section => {
            section.children = lowerSections.filter(lowerSection => {
                return lowerSection.path.includes(section.path) &&
                    section.path.split('/').length - lowerSection.path.split('/').length === -1
            })

        })

        buildNextLevel(processedPages, lowerSections, level + 1)
    }
    buildNextLevel(processedPages, sections, highestLevel)
    function visitNodes(nodes: TreeNode[]){
        for (let node of nodes) {
            node.followPath = node.children.length ? getFirstNonIndexPage(node.children).path : node.path
            visitNodes(node.children)
        }
    }
    visitNodes(sections)
    return sections
}

export function savePagesTrees(pages: PageReduced[]) {
    const unitedTree = constructPagesTree(pages)
    if (!fs.readdirSync('./').includes('temp'))
        fs.mkdirSync('./temp')
    fs.writeFileSync('./temp/pagesTrees.json', JSON.stringify(unitedTree, null, 2), "utf-8")
}
