import { Octokit } from 'octokit'
import {ReducedRepositoryRaw, RepositoriesListRaw} from "../types/github/api";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

export async function getRepoInfo (owner = 'th2-net', repoName: string){
    try {
        const { data: repo } = await octokit.rest.repos.get({
            owner,
            repo: repoName
        })
        const { data: releases } = await octokit.rest.repos.listReleases({
            owner,
            repo: repoName
        })
        if (!repo.description) repo.description = ''
        return {repository: repo, releases}
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function getRepoReleases(repo: ReducedRepositoryRaw){
    try {

        const { data: releases } = await octokit.rest.repos.listReleases({
            owner: repo.owner.login,
            repo: repo.name
        })
        return releases
    }
    catch (e) {
        return []
    }
}

export async function getAllTh2NetRepos(): Promise<RepositoriesListRaw> {
    try {
        const th2Net = await octokit.rest.orgs.get({ org: 'th2-net' })
        const repos: RepositoriesListRaw = []
        for (let i = 0; i * 100 < th2Net.data.public_repos; i ++) {
            repos.push(
              ...(await octokit.rest.repos.listForOrg({
                      org: 'th2-net',
                      per_page: 100,
                      page: i + 1 })).data
            )
        }
        return repos
    }
    catch (e) { return [] }
}
