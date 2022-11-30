import { DocumentsCollection } from "../../../types/gridsome/collections/documents"
import { TermsCollection } from "../../../types/gridsome/collections/terms"
import { RepositoriesCollection } from "../../../types/gridsome/collections/repositories"
import { ReleasesCollection } from "../../../types/gridsome/collections/releases"
import { TopicsCollection } from "../../../types/gridsome/collections/topics"

export type ContentToCheck = {
    nodeMeta: {
        typeName: string,
        id: string
    }
    fieldName: string
    content:string
}


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

