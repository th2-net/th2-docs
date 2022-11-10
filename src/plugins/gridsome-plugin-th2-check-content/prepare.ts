import {ContentToCheck, PrepareDataInput} from "./models";
import { markdownToTxt } from "markdown-to-txt";

export function prepareData({   documentsCollection,
                         termsCollection,
                         repositoriesCollection,
                         releasesCollection,
                         topicsCollection }: PrepareDataInput){
    const nodesToCheck: ContentToCheck[] = []
    documentsCollection._collection.data.forEach(doc => {
        const nodeMeta = {
            id: doc.path,
            typeName: doc.internal.typeName
        }
        nodesToCheck.push({
            content: markdownToTxt(doc.content),
            fieldName: 'content',
            nodeMeta
        })
        nodesToCheck.push({
            content: getStringsFromObjectDeep(doc)
              .filter(string => string !== doc.content)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        })
    })
    termsCollection._collection.data.forEach(term => {
        const nodeMeta = {
            id: term.id,
            typeName: term.internal.typeName
        }
        nodesToCheck.push({
            content: markdownToTxt(term.content),
            fieldName: 'content',
            nodeMeta
        })
        nodesToCheck.push({
            content: getStringsFromObjectDeep(term)
              .filter(string => string !== term.content)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        })
    })
    releasesCollection._collection.data.forEach(release => {
        const nodeMeta = {
            id: release.id.toString(),
            typeName: release.internal.typeName
        }

        nodesToCheck.push({
            content: markdownToTxt(release.body || ''),
            fieldName: 'body',
            nodeMeta
        })
        nodesToCheck.push({
            content: getStringsFromObjectDeep(release)
              .filter(string => string !== release.body)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        })
    })
    repositoriesCollection._collection.data.forEach(repository => {
        const nodeMeta = {
            id: repository.id.toString(),
            typeName: repository.internal.typeName
        }
        nodesToCheck.push({
            content: getStringsFromObjectDeep(repository)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        })
    })
    topicsCollection._collection.data.forEach(topic => {
        const nodeMeta = {
            id: topic.id,
            typeName: topic.internal.typeName
        }
        nodesToCheck.push({
            content: getStringsFromObjectDeep(topic)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        })
    })
    return {
        contentToCheck: nodesToCheck.filter(node => !!node.content),
        unitedCollection: [
          ...documentsCollection._collection.data,
          ...termsCollection._collection.data,
          ...releasesCollection._collection.data,
          ...repositoriesCollection._collection.data,
          ...topicsCollection._collection.data
        ]
    }
}

export function getStringsFromObjectDeep(object: any, strings: string[] = []){
    if (!!object && typeof object == 'object') {
        for (let value of Object.values(object)) {
            if (typeof value === 'object' || Array.isArray(value)) {
                getStringsFromObjectDeep(value, strings)
            }
            if (typeof value === 'string'){
                strings.push(value)
            }
        }
    }
    return strings
}

