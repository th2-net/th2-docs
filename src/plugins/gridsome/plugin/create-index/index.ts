import {GridsomeCollection, } from "../../../types/utils";
import {markdownToTxt} from 'markdown-to-txt'
import * as fs from 'fs'

type DocPage = {
  path: string
  title: string
  content: string
}

type DocPageCollection = GridsomeCollection<DocPage>

const PAGES_IN_FILE = 5

module.exports = (api: any) => {
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const readmePages: DocPageCollection = getCollection('ReadmePage')
    const docPages: DocPageCollection = getCollection('DocPage')

    const allPages = [
      ...docPages._collection.data
        .filter(page => !readmePages._collection.data.some(readme => readme.path === page.path)), 
      ...readmePages._collection.data
    ]

    const indexFiles: DocPage[][] = []
    const indexFilesCount = Math.ceil(allPages.length / PAGES_IN_FILE) 
    for (let file = 0; file < indexFilesCount; file++){
      const pages: DocPage[] = []
      for (let page = 0; page < PAGES_IN_FILE; page++){
        const pageContent = allPages[file * PAGES_IN_FILE + page]
        if (pageContent)
          pages.push({
            title: pageContent.title,
            path: pageContent.path,
            content: markdownToTxt(pageContent.content)
          })
      }
      indexFiles.push(pages)
    }

    fs.mkdirSync('./static/__es-index', { recursive: true })
    fs.writeFileSync(
      './static/__es-index/meta.json', 
        JSON.stringify({
        count: allPages.length,
        updated_at: new Date(),
        files: indexFiles.map((file, index) => `index-${index}.json`)
      }, null, 2), 
      { encoding: 'utf-8' }
    )
    indexFiles.forEach((file, index) => {
      fs.writeFileSync(
        `./static/__es-index/index-${index}.json`, 
          JSON.stringify(file, null, 2), 
        { encoding: 'utf-8' }
      )
    })
  })
}