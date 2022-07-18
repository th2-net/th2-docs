const {prepareData} = require('./prepare')
const {checkNode} = require('./check')
const cliProgress = require('cli-progress')

module.exports = function (api){
    api.loadSource(({ getCollection }) => {
        const documentsCollection= getCollection('DocPage'),
          termsCollection= getCollection('Term'),
          repositoriesCollection= getCollection('Repository'),
          releasesCollection= getCollection('Release'),
          topicsCollection= getCollection('Topic')

        const {contentToCheck} = prepareData({
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
            checkNode(node)
            progress.update(index+1)
        })
        progress.stop()
        console.timeEnd('check_content')
    })
}
