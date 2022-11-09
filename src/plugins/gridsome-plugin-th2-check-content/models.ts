import {ReducedRepositoryRaw, ReducedReleaseRaw} from "../gridsome-source-th2-github/types";

export type ContentToCheck = {
    nodeMeta: {
        typeName: string,
        id: string
    }
    fieldName: string
    content:string
}

type GraphInternal = {
    typeName: string
}

type GridsomeCollection<ItemType> = {
    _collection: {
        data: (ItemType & {internal: GraphInternal})[]
    }
}

export type DocumentsCollection = GridsomeCollection<{
    id: string
    path: string
    content: string
}>
export type TermsCollection = GridsomeCollection<{
    id: string
    content: string
}>
export type RepositoriesCollection = GridsomeCollection<ReducedRepositoryRaw>
export type ReleasesCollection = GridsomeCollection<ReducedReleaseRaw>
export type TopicsCollection = GridsomeCollection<{
    id: string
    title: string
    content: string
}>

export type PrepareDataInput = {
    documentsCollection: DocumentsCollection
    termsCollection: TermsCollection
    repositoriesCollection: RepositoriesCollection
    releasesCollection: ReleasesCollection
    topicsCollection: TopicsCollection
}

const extractUrlsUntyped = require("extract-urls")

export function extractUrls(text: string, lowercase: boolean = false): string[] | null{
    return extractUrlsUntyped(text, lowercase)
}

