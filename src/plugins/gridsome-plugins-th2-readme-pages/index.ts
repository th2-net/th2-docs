import {DocumentsCollection} from "../types/gridsome/collections/documents";
import {clearCache, readDoc, writeReadmeFile, getMarkdownFile} from "./utils";

module.exports = async function (api: any) {
  api.loadSource(async ({ getCollection, addCollection, store }: any) => {
    // Create cache
    const docsCollection: DocumentsCollection = getCollection('DocPage')
    const docsToReplace = docsCollection._collection.data.filter(doc => !!doc.readme)

    clearCache()

    for (let doc of docsToReplace){
      if (!doc.readme) continue
      const content = `${readDoc(doc.fileInfo.path)}\n${await getMarkdownFile(doc.readme)}`
      writeReadmeFile(doc.fileInfo.path, content)
    }


    // Merge cache collection into docs collection
    const readmesCollection: DocumentsCollection = getCollection('ReadmePage')
    readmesCollection._collection.data.forEach((readme, i) => {
      const index = docsCollection._collection.data.findIndex(doc => doc.fileInfo.path === readme.fileInfo.path)
      if (index !== -1){
        docsCollection._collection.data[index] = readme
      }
      readmesCollection._collection.data.splice(i, 1)
    })
  })
}
