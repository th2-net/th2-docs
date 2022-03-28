import {ContentRepo, RepoResponse, RepoGroupByFamily, repositoryToRepoResponse} from "../../apiTypes/github/dashboard-info";
import {Repositories, Repository} from "@saber2pr/types-github-api";
import axios from "axios";

const getAllTh2NetRepos = async (githubAuth: any): Promise<Repositories> => {
  let response = await axios.get(`https://api.github.com/orgs/th2-net/repos?per_page=100&page=1`, { auth: githubAuth })
  const repos: Repositories = [...response.data]
  response = await axios.get(`https://api.github.com/orgs/th2-net/repos?per_page=100&page=2`, { auth: githubAuth })
  repos.push(...response.data)
  return repos
}

export const getReleasesFeedRepos = async (th2Repos: ContentRepo[], githubAuth: any): Promise<RepoResponse[]> => {
  const repos = await getAllTh2NetRepos(githubAuth)
  const reposWithReleases = await Promise.all(
    repos.map(async (repo): Promise<RepoResponse> => {
      let { data: releases } = await axios.get(repo.releases_url.replace('{/id}', ''), { auth: githubAuth })
      const result = repositoryToRepoResponse(repo)
      result.releases = releases
      return result
    }))
  const filteredRepos = reposWithReleases.filter((repo) => repo.releases?.length)
  // Sort - repos with newest releases are first
  const sortedRepos = filteredRepos.sort((a: RepoResponse, b: RepoResponse) => {
    if (a.releases[0].published_at > b.releases[0].published_at  ) {
      return -1;
    }
    if (a.releases[0].published_at < b.releases[0].published_at) {
      return 1;
    }
    // a должно быть равным b
    return 0;
  })
  return sortedRepos
}

// export const getReposFamilies = async (th2Repos: ContentRepo[], githubAuth: any): Promise<RepoGroupByFamily[]> => {
//   const families: string[] = [...new Set(th2Repos.map(repo => repo.Family))]
//   return await Promise.all(families.filter(f => f).map(async (f): Promise<RepoGroupByFamily> => {
//     return {
//       family: f,
//       repos: await Promise.all(
//         th2Repos
//           .filter(r => r.Family === f)
//           .map(async (repo): Promise<RepoResponse> => {
//             const { data: result }: { data: Repository } = await axios.get(`https://api.github.com/repos/th2-net/${repo.Name}`, { auth: githubAuth })
//             const repoResponse = repositoryToRepoResponse(result)
//             repoResponse.custom_info = repo
//             return repoResponse
//           })
//       )
//     }
//   }))
// }

export const getReposFamiliesByTopics = async (githubAuth: any): Promise<RepoGroupByFamily[]> => {
  const repos = await getAllTh2NetRepos(githubAuth)
  // @ts-ignore
  const reposWithTopics: Repositories = repos.filter(repo => repo?.topics?.length)
  const allTopics: string[] = [...new Set(
    // @ts-ignore
    reposWithTopics.reduce((accumulator: string[], current) => [...accumulator, ...current.topics], [])
  )]
  const GROUPS: string[] = ['th2-infra', 'th2-core', 'th2-check1', 'th2-library', 'th2-act', 'th2-conn', 'th2-check2', 'th2-act-ui']
  const infoTopics: string[] = allTopics.filter(t => !GROUPS.includes(t))
  return await Promise.all(GROUPS.map(async (group): Promise<RepoGroupByFamily> => {
    return {
      family: group,
      repos: await Promise.all(
        reposWithTopics
          // @ts-ignore
          .filter(r => r.topics.includes(group))
          .map(r => {
            const repoResponse = repositoryToRepoResponse(r)
            // @ts-ignore
            repoResponse.custom_info = { info_topics: infoTopics.filter(t => r.topics.includes(t)) }
            return repoResponse
          })
          
      )
    }
  }))
}
