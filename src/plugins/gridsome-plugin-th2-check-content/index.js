const {prepareData} = require('./prepare')
const {checkContent, checkObjectForUrls} = require('./check')
const cliProgress = require('cli-progress')

module.exports = function (api){
    api.loadSource(({ getCollection }) => {
        const documentsCollection= getCollection('DocPage'),
          termsCollection= getCollection('Term'),
          repositoriesCollection= getCollection('Repository'),
          releasesCollection= getCollection('Release'),
          topicsCollection= getCollection('Topic')

        const {contentToCheck, unitedCollection} = prepareData({
            documentsCollection,
            termsCollection,
            repositoriesCollection,
            releasesCollection,
            topicsCollection
        })
        console.log('Checking content...')
        console.time('check_content')
        const progress = new cliProgress.SingleBar({  }, cliProgress.Presets.shades_classic);
        progress.start(contentToCheck.length, 0)
        contentToCheck.forEach((node, index) => {
            checkContent(node)
            progress.update(index+1)
        })
        progress.stop()
        console.timeEnd('check_content')

        console.log('Checking urls...')
        console.time('check_urls')
        progress.start(unitedCollection.length, 0)
        contentToCheck.forEach((node, index) => {
            checkObjectForUrls(node)
            progress.update(index+1)
        })
        progress.stop()
        console.timeEnd('check_urls')
    })
}
