import {GridsomeCollection} from "../../utils";

export type SectionItem = {
  title: string
  basePath: string
  firstPage: string
  contentTreeJSON: string
}

export type SectionsCollection = GridsomeCollection<SectionItem>
