import {saveDashboardData, getReleasesFeedRepos, getReposFamiliesByTopics} from './dashboard'
import { RepositoriesCollection } from '../../../types/gridsome/collections/repositories'
import { ReleasesCollection } from '../../../types/gridsome/collections/releases'
import { TopicsCollection } from '../../../types/gridsome/collections/topics'

module.exports = function (api: any) {
    api.loadSource(({ getCollection }: any) => {
        const repositoriesCollection: RepositoriesCollection = getCollection('Repository')
        const releasesCollection: ReleasesCollection = getCollection('Release')
        const topicsCollection: TopicsCollection = getCollection('Topic')
        const repositories = repositoriesCollection._collection.data.map(repo => {
            return {
                ...repo,
                releases: repo.releases.map(r => releasesCollection.getNodeById(r.id))
            }
        })
        // TODO: optimize data for dashboard
        saveDashboardData({
            // @ts-ignore
            releasesFeed: getReleasesFeedRepos(repositories),
            // @ts-ignore
            families: getReposFamiliesByTopics(repositories, topicsCollection._collection.data.map(t => t.title))
        })
    })
}
