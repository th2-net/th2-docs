import {GridsomeCollection} from "../../../types/utils";
import {ModuleDocItem, ModuleNote} from "./types";

module.exports = (api: any) => {
  // Construct content trees
  api.loadSource(({ getCollection, addCollection }: any) => {
    const modulesIndex: GridsomeCollection<ModuleNote> = addCollection('ModuleNote')
    const modules: GridsomeCollection<ModuleDocItem> = getCollection('ModulePage')

    const nonDocumentedModules: ModuleNote[] = require('../../../../../content/modules/not-documented-modules.json')

    nonDocumentedModules.forEach(module => modulesIndex.addNode({
      ...module,
      id: module.name
    }))

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
          docs: module.path,
          github: module.github,
          description: module.description,
          tags: module.tags ?? []
        })
      })
  })
}
