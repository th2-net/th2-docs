const axios = require("axios");

const githubAuth = {
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_CLIENT_SECRET
}

module.exports.getRepoInfo = async function(owner = 'th2-net', repoName){
    try {
        const { data: repo } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, { auth: githubAuth })
        const { data: releases } = await axios.get(repo.releases_url.replace('{/id}', ''), { auth: githubAuth })
        if (!repo.description) repo.description = ''
        return {repository: repo, releases}
    }
    catch (e) {
        return null
    }
}

module.exports.getRepoReleases = async function(repo){
    try {
        const { data: releases } = await axios.get(repo.releases_url.replace('{/id}', ''), { auth: githubAuth })
        return releases
    }
    catch (e) {
        return []
    }
}

module.exports.getAllTh2NetRepos = async function () {
    try {
        let response = await axios.get(`https://api.github.com/orgs/th2-net/repos?per_page=100&page=1`, { auth: githubAuth })
        const repos = [...response.data]
        response = await axios.get(`https://api.github.com/orgs/th2-net/repos?per_page=100&page=2`, { auth: githubAuth })
        repos.push(...response.data)
        response = await axios.get(`https://api.github.com/orgs/th2-net/repos?per_page=100&page=3`, { auth: githubAuth })
        repos.push(...response.data)
        return repos
    }
    catch (e) { return [] }
}
