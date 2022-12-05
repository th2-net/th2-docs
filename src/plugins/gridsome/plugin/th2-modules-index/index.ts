import {GridsomeCollection} from "../../../types/utils";
import {ModuleDocItem, ModuleNote} from "./types";
import {DocumentsCollection} from "../../../types/gridsome/collections/documents";

module.exports = (api: any) => {
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const modulesIndex: GridsomeCollection<ModuleNote> = addCollection('ModuleNote')
    const modules: GridsomeCollection<ModuleDocItem> = getCollection('ModulePage')

    modules._collection.data
      .filter((module) => {
        const sections = module.path.split('/')
        sections.splice(sections.length - 2)
        return sections[sections.length - 1] === 'modules'
      })
      .forEach((module) => {
        const name = ['_index', 'index'].includes(module.fileInfo.name) ? module.fileInfo.directory : module.fileInfo.name
        modulesIndex.addNode({
          id: name,
          name: name,
          prod_repos: module.prod_repos,
          custom_repos: module.custom_repos,
          docs: module.path,
          description: module.description
        })
      })
  })
}
