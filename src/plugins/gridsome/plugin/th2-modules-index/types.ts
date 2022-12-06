import {DocItem} from "../../../types/gridsome/collections/documents";

export type ModuleNote = {
  name: string
  tags: string[]
  docs?: string
  github?: string
  description?: string
}

export type ModuleDocItem = DocItem & ModuleNote
