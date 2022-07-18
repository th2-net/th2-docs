const { ContentToCheck } = require('./models')
const { markdownToTxt } = require('markdown-to-txt')

function prepareData({   documentsCollection,
                         termsCollection,
                         repositoriesCollection,
                         releasesCollection,
                         topicsCollection }){
    const nodesToCheck = [new ContentToCheck({})]
    nodesToCheck.pop()
    documentsCollection._collection.data.forEach(doc => {
        const nodeMeta = {
            id: doc.path,
            typeName: doc.internal.typeName
        }
        nodesToCheck.push(new ContentToCheck({
            content: markdownToTxt(doc.content),
            fieldName: 'content',
            nodeMeta
        }))
        nodesToCheck.push(new ContentToCheck({
            content: getStringsFromObjectDeep(doc)
              .filter(string => string !== doc.content)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        }))
    })
    termsCollection._collection.data.forEach(term => {
        const nodeMeta = {
            id: term.id,
            typeName: term.internal.typeName
        }
        nodesToCheck.push(new ContentToCheck({
            content: markdownToTxt(term.content),
            fieldName: 'content',
            nodeMeta
        }))
        nodesToCheck.push(new ContentToCheck({
            content: getStringsFromObjectDeep(term)
              .filter(string => string !== term.content)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        }))
    })
    releasesCollection._collection.data.forEach(release => {
        const nodeMeta = {
            id: release.id,
            typeName: release.internal.typeName
        }

        nodesToCheck.push(new ContentToCheck({
            content: markdownToTxt(release.body),
            fieldName: 'body',
            nodeMeta
        }))
        nodesToCheck.push(new ContentToCheck({
            content: getStringsFromObjectDeep(release)
              .filter(string => string !== release.body)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        }))
    })
    repositoriesCollection._collection.data.forEach(repository => {
        const nodeMeta = {
            id: repository.id,
            typeName: repository.internal.typeName
        }
        nodesToCheck.push(new ContentToCheck({
            content: getStringsFromObjectDeep(repository)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        }))
    })
    topicsCollection._collection.data.forEach(topic => {
        const nodeMeta = {
            id: topic.id,
            typeName: topic.internal.typeName
        }
        nodesToCheck.push(new ContentToCheck({
            content: getStringsFromObjectDeep(topic)
              .join('\n'),
            fieldName: 'other',
            nodeMeta
        }))
    })
    return {
        contentToCheck: nodesToCheck.filter(node => !!node.content)
    }
}

function getStringsFromObjectDeep(object, strings = []){
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

module.exports = { prepareData }
