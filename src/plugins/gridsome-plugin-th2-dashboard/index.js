"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("./dashboard");
//const {saveDashboardData, getReleasesFeedRepos, getReposFamiliesByTopics} = require("./dashboard");
module.exports = function (api) {
    api.loadSource(({ getCollection }) => {
        const repositoriesCollection = getCollection('Repository');
        const releasesCollection = getCollection('Release');
        const topicsCollection = getCollection('Topic');
        const repositories = repositoriesCollection._collection.data.map((repo) => {
            return Object.assign(Object.assign({}, repo), { releases: repo.releases.map((r) => releasesCollection.getNodeById(r.id)), topics: repo.topics.map((t) => t.id) });
        });
        // TODO: optimize data for dashboard
        (0, dashboard_1.saveDashboardData)({
            releasesFeed: (0, dashboard_1.getReleasesFeedRepos)(repositories),
            families: (0, dashboard_1.getReposFamiliesByTopics)(repositories, topicsCollection._collection.data.map((t) => t.title))
        });
    });
};
