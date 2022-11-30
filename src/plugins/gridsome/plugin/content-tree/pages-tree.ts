import * as fs from 'fs'
import {PageReduced, TreeNode} from "./types";

function constructPagesTree(pages: PageReduced[]){
    const processedPages: TreeNode[] = pages
        .map(page => ({...page, children: []}))
        .sort((a, b) => {
            if ((a?.weight || -100) < (b?.weight || -100)) return -1
            if ((a?.weight || -100) > (b?.weight || -100)) return 1
            return 0
        })
    // Higher level pages
    let sections = processedPages.filter(page => {
        const pathFolders = page.path.split('/')
        return pathFolders.length === 3
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
    buildNextLevel(processedPages, sections, 3)
    return sections
}

export function savePagesTrees(pages: PageReduced[]) {
    const unitedTree = constructPagesTree(pages)
    if (!fs.readdirSync('./').includes('temp'))
        fs.mkdirSync('./temp')
    fs.writeFileSync('./temp/pagesTrees.json', JSON.stringify(unitedTree, null, 2), "utf-8")
}
