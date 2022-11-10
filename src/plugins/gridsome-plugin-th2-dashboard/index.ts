import {saveDashboardData, getReleasesFeedRepos, getReposFamiliesByTopics} from './dashboard'

module.exports = function (api: any) {
    api.loadSource(({ getCollection }: any) => {
        const repositoriesCollection = getCollection('Repository')
        const releasesCollection = getCollection('Release')
        const topicsCollection = getCollection('Topic')
        const repositories = repositoriesCollection._collection.data.map((repo: any) => {
            return {
                ...repo,
                releases: repo.releases.map((r: any) => releasesCollection.getNodeById(r.id)),
                topics: repo.topics.map((t: any) => t.id)
            }
        })
        // TODO: optimize data for dashboard
        saveDashboardData({
            releasesFeed: getReleasesFeedRepos(repositories),
            families: getReposFamiliesByTopics(repositories, topicsCollection._collection.data.map((t:any) => t.title))
        })
    })
}
