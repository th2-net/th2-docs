const {prepareData} = require('./prepare')
const {checkNode} = require('./check')
const cliProgress = require('cli-progress')

function checkContent ({   documentsCollection,
                                termsCollection,
                                repositoriesCollection,
                                releasesCollection,
                                topicsCollection }){
    const {nodesToCheck} = prepareData({
        documentsCollection,
        termsCollection,
        repositoriesCollection,
        releasesCollection,
        topicsCollection
    })
    console.log('Checking content...')
    console.time('check_content')
    const progress = new cliProgress.SingleBar({  }, cliProgress.Presets.shades_classic);
    progress.start(nodesToCheck.length, 0)
    nodesToCheck.forEach((node, index) => {
        checkNode(node)
        progress.update(index+1)
    })
    progress.stop()
    console.timeEnd('check_content')
}

module.exports = function (api){
    api.loadSource(({ getCollection }) => {
        checkContent({
            documentsCollection: getCollection('DocPage'),
            termsCollection: getCollection('Term'),
            repositoriesCollection: getCollection('Repository'),
            releasesCollection: getCollection('Release'),
            topicsCollection: getCollection('Topic')
        })
    })
}
