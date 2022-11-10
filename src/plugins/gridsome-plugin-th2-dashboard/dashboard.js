"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDashboardData = exports.getReposFamiliesByTopics = exports.getReleasesFeedRepos = void 0;
const fs = __importStar(require("fs"));
//const fs = require('fs')
function getReleasesFeedRepos(repositories) {
    const filteredRepos = repositories.filter((repo) => { var _a; return (_a = repo.releases) === null || _a === void 0 ? void 0 : _a.length; });
    // Sort - repos with newest releases are first
    const sortedRepos = filteredRepos.sort((a, b) => {
        if (a.releases[0].published_at > b.releases[0].published_at) {
            return -1;
        }
        if (a.releases[0].published_at < b.releases[0].published_at) {
            return 1;
        }
        // a = b
        return 0;
    });
    return sortedRepos;
}
exports.getReleasesFeedRepos = getReleasesFeedRepos;
function getReposFamiliesByTopics(repositories, allTopics = []) {
    const reposWithTopics = repositories.filter((repo) => { var _a; return (_a = repo === null || repo === void 0 ? void 0 : repo.topics) === null || _a === void 0 ? void 0 : _a.length; });
    const GROUPS = ['th2-infra', 'th2-core', 'th2-check1', 'th2-act', 'th2-conn', 'th2-check2', 'th2-act-ui'];
    const infoTopics = allTopics.filter(t => !GROUPS.includes(t));
    return GROUPS.map((group) => {
        return {
            family: group,
            repos: reposWithTopics
                .filter((r) => r.topics.includes(group))
                .map((r) => {
                r.custom_info = { info_topics: infoTopics.filter(t => r.topics.includes(t)) };
                return r;
            })
        };
    });
}
exports.getReposFamiliesByTopics = getReposFamiliesByTopics;
function saveDashboardData(data) {
    if (!fs.readdirSync('./').includes('temp'))
        fs.mkdirSync('./temp');
    fs.writeFileSync('./temp/dashboard.json', JSON.stringify(data, null, 2), "utf-8");
}
exports.saveDashboardData = saveDashboardData;
module.exports = {
    getReleasesFeedRepos,
    getReposFamiliesByTopics,
    saveDashboardData
};
