import { GridsomeCollection } from "../../utils"

export type DocumentsCollection = GridsomeCollection<{
  id: string
  path: string
  content: string
}>