import { GridsomeCollection } from "../../utils"

export type DocumentsCollection = GridsomeCollection<{
  id: string
  path: string
  content: string
  readme?: string
  fileInfo: {
    extension: string
    directory: string
    path: string
    name: string
  }
}>
