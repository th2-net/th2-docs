const {getRepoInfo, getAllTh2NetRepos, getRepoReleases} = require('./github')
const cliProgress = require('cli-progress')
const progress = new cliProgress.SingleBar({  }, cliProgress.Presets.shades_classic)

module.exports = function (api){
    api.loadSource(async ({ getCollection, addCollection, store }) => {
        const repositoriesCollection = addCollection('Repository')
        const releasesCollection = addCollection('Release')
        const topicsCollection = addCollection('Topic')
        const docPagesCollection = getCollection('DocPage')
        // Load repos for document pages
        console.log('Linking pages to GitHub repos...')
        console.time('load_repos_for_pages')
        progress.start(docPagesCollection._collection.data.length, 0)
        let count = 1
        for (const docPage of docPagesCollection._collection.data) {
            if (docPage.repo && docPage.repo_owner) {
                const {repository, releases} = await getRepoInfo(docPage.repo_owner, docPage.repo)
                for (const release of releases){
                    if (!releasesCollection.getNodeById(release.id))
                        releasesCollection.addNode(release)
                }
                repository.releases = releases.map(r => store.createReference('Release', r.id))
                for (const topic of repository.topics) {
                    if (topicsCollection.getNodeById(topic))
                        topicsCollection.addNode({ id: topic, title: topic })
                }
                repository.topics = repository.topics.map(t => store.createReference('Topic', t.id))
                if (!repositoriesCollection.getNodeById(repository.id))
                    repositoriesCollection.addNode(repository)
                docPage._githubRepository = store.createReference('Repository', repository.id)
                docPage.internal.mimeType = 'text/markdown'
                docPage.repo = null
                docPage.repo_owner = null
                docPage.internal.content = docPage.content
                if (docPage._githubRepository)
                    docPagesCollection.updateNode(docPage)
            }
            progress.update(count++)
        }
        progress.stop()
        console.timeEnd('load_repos_for_pages')

        // Load all th2 repos
        const repos = await getAllTh2NetRepos()
        console.log('Loading all th2 repositories...')
        console.time('load_all_th2_repos')
        progress.start(repos.length, 0)
        count = 1
        for (const repository of repos) {
            const releases = await getRepoReleases(repository)
            for (const release of releases){
                if (!releasesCollection.getNodeById(release.id))
                    releasesCollection.addNode(release)
            }
            repository.releases = releases.map(r => store.createReference('Release', r.id))
            for (const topic of repository.topics) {
                if (topicsCollection.getNodeById(topic))
                    topicsCollection.addNode({ id: topic, title: topic })
            }
            repository.topics = repository.topics.map(t => store.createReference('Topic', t))
            if (!repositoriesCollection.getNodeById(repository.id))
                repositoriesCollection.addNode(repository)
            progress.update(count++)
        }
        progress.stop()
        console.timeEnd('load_all_th2_repos')
    })
}
