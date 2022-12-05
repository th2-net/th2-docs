import {DocItem} from "../../../types/gridsome/collections/documents";

export type ModuleNote = {
  name: string
  docs?: string
  description?: string
  prod_repos?: ProdModuleNoteRepos
  custom_repos?: CustomModuleNoteRepos
}

export type ProdModuleNoteRepos = {
  box: ModuleNoteRepo
  grpc?: ModuleNoteRepo
}

export type CustomModuleNoteRepos = {
  core: ModuleNoteRepo[]
  implementations: ProdModuleNoteRepos[]
  templates: ProdModuleNoteRepos[]
}

export type ModuleNoteRepo = {
  name: string
  link: string
}

export type ModuleDocItem = DocItem & ModuleNote
