import { GridsomeCollection } from "../../utils"


export type DocItem = {
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
}
export type DocumentsCollection = GridsomeCollection<DocItem>
