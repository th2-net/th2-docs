export const processSearchMixin = {
  methods:{
    processPagesPaths(pages = []){
      function deleteLastFolder(path){
        const sections = path.split('/')
        sections.pop()
        return sections.join('/')
      }
      function isIndex(path, dir){
        if (path.indexOf('_index') === -1) return false
        else return path.replace('/_index','') === dir
      }
      return pages.map(page => {
        let newPath, newDir
        if (page.path){
          newPath = isIndex(page.path, page.dir) ? page.dir : page.path
        }
        if (page.dir){
          newDir = isIndex(page.path, page.dir) ? deleteLastFolder(page.dir) : page.dir
        }
        return {
          ...page,
          path: newPath,
          dir: newDir,
        }
      })
    },
    constructPagesTree(pages){
      const processedPages = this.processPagesPaths(pages).map(page => {
        return {...page, children: []}
      })
      // Список секций верхнего уровня
      let sections = processedPages.filter(page => {
        const pathFolders = page.path.split('/')
        return pathFolders.length === 2
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
          section.children = lowerSections.filter(lowerSection => section.path === lowerSection.dir)
        })

        buildNextLevel(processedPages, lowerSections, level + 1)
      }
      buildNextLevel(processedPages, sections, 2)
      return sections
    }
  }
}
