const { NodeToCheck } = require('./models')
const { markdownToTxt } = require('markdown-to-txt')

function prepareData({   documentsCollection,
                         termsCollection,
                         repositoriesCollection,
                         releasesCollection,
                         topicsCollection }){
    const nodesToCheck = [new NodeToCheck({})]
    nodesToCheck.pop()
    documentsCollection._collection.data.forEach(doc => {
        const nodeMeta = {
            id: doc.path,
            typeName: doc.internal.typeName
        }

        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(doc.content),
            fieldName: 'content',
            nodeMeta
        }))

        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(doc.title),
            fieldName: 'title',
            nodeMeta
        }))

        nodesToCheck.push(new NodeToCheck({
            content: doc.description,
            fieldName: 'description',
            nodeMeta
        }))

        nodesToCheck.push(new NodeToCheck({
            content: doc.path,
            fieldName: 'path',
            nodeMeta
        }))
    })
    termsCollection._collection.data.forEach(term => {
        const nodeMeta = {
            id: term.id,
            typeName: term.internal.typeName
        }

        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(term.content),
            fieldName: 'content',
            nodeMeta
        }))
        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(term.title),
            fieldName: 'title',
            nodeMeta
        }))
    })

    topicsCollection._collection.data.forEach(topic => {
        const nodeMeta = {
            id: topic.id,
            typeName: topic.internal.typeName
        }

        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(topic.title),
            fieldName: 'title',
            nodeMeta
        }))
    })
    repositoriesCollection._collection.data.forEach(repo => {
        const nodeMeta = {
            id: repo.id,
            typeName: repo.internal.typeName
        }

        nodesToCheck.push(new NodeToCheck({
            content: repo.title,
            fieldName: 'title',
            nodeMeta
        }))

        nodesToCheck.push(new NodeToCheck({
            content: repo.description,
            fieldName: 'description',
            nodeMeta
        }))
    })

    releasesCollection._collection.data.forEach(release => {
        const nodeMeta = {
            id: release.id,
            typeName: release.internal.typeName
        }

        nodesToCheck.push(new NodeToCheck({
            content: release.title,
            fieldName: 'title',
            nodeMeta
        }))

        nodesToCheck.push(new NodeToCheck({
            content: markdownToTxt(release.body),
            fieldName: 'body',
            nodeMeta
        }))
    })
    return {nodesToCheck: nodesToCheck.filter(node => !!node.content)}
}

module.exports = { prepareData }
