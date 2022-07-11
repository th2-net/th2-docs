const {saveDashboardData, getReleasesFeedRepos, getReposFamiliesByTopics} = require("./dashboard");
module.exports = function (api) {
    api.loadSource(({ getCollection }) => {
        const repositoriesCollection = getCollection('Repository')
        const releasesCollection = getCollection('Release')
        const topicsCollection = getCollection('Topic')
        const repositories = repositoriesCollection._collection.data.map(repo => {
            return {
                ...repo,
                releases: repo.releases.map(r => releasesCollection.getNodeById(r.id)),
                topics: repo.topics.map(t => t.id)
            }
        })
        // TODO: optimize data for dashboard
        saveDashboardData({
            releasesFeed: getReleasesFeedRepos(repositories),
            families: getReposFamiliesByTopics(repositories, topicsCollection._collection.data.map(t => t.title))
        })
    })
}
