import {getRepoInfo, getAllTh2NetRepos, getRepoReleases} from './github'
import * as cliProgress from 'cli-progress'
const progress = new cliProgress.SingleBar({  }, cliProgress.Presets.shades_classic)


module.exports = function (api: any){
    api.loadSource(async ({ getCollection, addCollection, store }: any) => {
        const repositoriesCollection = addCollection('Repository')
        const releasesCollection = addCollection('Release')
        const topicsCollection = addCollection('Topic')
        const docPagesCollection = getCollection('DocPage')

        function addRepoToDatabase(repository: any, releases: any) {
            for (const release of releases){
                if (!releasesCollection.getNodeById(release.id))
                    releasesCollection.addNode(release)
            }
            repository.releases = releases.map((r: any) => store.createReference('Release', r.id))
            for (const topic of repository.topics) {
                if (!topicsCollection.getNodeById(topic))
                    topicsCollection.addNode({ id: topic, title: topic })
            }
            repository.topics = repository.topics.map((t: string) => store.createReference('Topic', t))
            if (!repositoriesCollection.getNodeById(repository.id))
                repositoriesCollection.addNode(repository)
        }
        // Load repos for document pages
        // console.log('Linking pages to GitHub repos...')
        // console.time('load_repos_for_pages')
        // progress.start(docPagesCollection._collection.data.length, 0)
        // let count = 1
        // let promises = docPagesCollection._collection.data.map(async (docPage: any) => {
        //     if (docPage.repo && docPage.repo_owner) {
        //         const details = await getRepoInfo(docPage.repo_owner, docPage.repo)
        //         if (!details) return
        //         const {repository, releases} = details
        //         addRepoToDatabase(repository, releases)
        //         docPage._githubRepository = store.createReference('Repository', repository.id)
        //         docPage.internal.mimeType = 'text/markdown'
        //         docPage.repo = null
        //         docPage.repo_owner = null
        //         docPage.internal.content = docPage.content
        //         if (docPage._githubRepository)
        //             docPagesCollection.updateNode(docPage)
        //     }
        //     progress.update(count++)
        // })
        // await Promise.all(promises)
        // progress.stop()
        // console.timeEnd('load_repos_for_pages')

        // Load all th2 repos
        if (process.env.NODE_ENV === 'production'){
            const repos = await getAllTh2NetRepos()
            console.log('Loading all th2 repositories...')
            console.time('load_all_th2_repos')
            progress.start(repos.length, 0)
            let count = 1
            let promises = repos.map(async (repository) => {
                const releases = await getRepoReleases(repository)
                addRepoToDatabase(repository,releases)
                progress.update(count++)
            })
            await Promise.all(promises)
            progress.stop()
            console.timeEnd('load_all_th2_repos')
        }
        else
            console.log('Skipping all th2 repos')
    })
}
