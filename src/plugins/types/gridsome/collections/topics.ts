import { GridsomeCollection } from "../../utils"

export type TopicItem = {
  id: string
  title: string
  content: string
}

export type TopicsCollection = GridsomeCollection<TopicItem>