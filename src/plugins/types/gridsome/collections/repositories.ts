import { GridsomeCollection } from "../../utils"
import { ReducedReleaseRaw, ReducedRepositoryRaw } from "../../github/api"
import { TopicItem } from "./topics"

export type RepositoryItem = Omit<ReducedRepositoryRaw, 'topics'> & {
  releases: ReducedReleaseRaw[]
  topics: TopicItem[]
}

export type RepositoriesCollection = GridsomeCollection<RepositoryItem>