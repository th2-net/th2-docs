const fs = require('fs')

function constructPagesTree(pages){
    const processedPages = pages
        .map(page => ({...page, children: []}))
        .sort((a, b) => {
            if ((a?.weight || -100) < (b?.weight || -100)) return -1
            if ((a?.weight || -100) > (b?.weight || -100)) return 1
            return 0
        })
    // Список секций верхнего уровня
    let sections = processedPages.filter(page => {
        const pathFolders = page.path.split('/')
        return pathFolders.length === 3
    })
    function buildNextLevel(allPages, higherSections, level = 1){
        // Находим все страницы на уровень ниже
        let lowerSections = allPages.filter(page => {
            const pathFolders = page.path.split('/')
            return pathFolders.length === (level + 1)
        })
        // Проверяем, есть ли страницы на уровень ниже
        if (lowerSections.length === 0)
            return;
        // Присваиваем дочерние страницы
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

module.exports.savePagesTrees = function(pages) {
    const unitedTree = constructPagesTree(pages)
    if (!fs.readdirSync('./').includes('temp'))
        fs.mkdirSync('./temp')
    fs.writeFileSync('./temp/pagesTrees.json', JSON.stringify(unitedTree, null, 2), "utf-8")
}
