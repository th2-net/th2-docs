import { Router, Request, Response} from "express";
import axios from "axios";

try{
  require('dotenv').config()
}
catch (e){}

const githubAuth: any = {
  username: process.env.GITHUB_CLIENT_ID,
  password: process.env.GITHUB_CLIENT_SECRET
}
// Types
import {Repositories, Repository} from "@saber2pr/types-github-api";
import {RepoResponse, repositoryToRepoResponse} from "../apiTypes/github/dashboard-info";
// Cache
const cache: Map<string, any> = new Map()

// Routes

const router: Router = Router()

router.get('/dashboard-info', async (req: Request, res: Response) => {
  try {
    if (cache.has('dashboard-info')) {
      res.send(cache.get('dashboard-info'))
      return
    }
    const response = await axios.get('https://api.github.com/orgs/th2-net/repos?per_page=100', { auth: githubAuth })
    const repos: Repositories = response.data
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
    cache.set('dashboard-info', sortedRepos)
    res.send(sortedRepos)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }

})

router.get('/box/:owner/:repo', async (req: Request, res: Response) => {
  try {
    const owner: string = req.params['owner']
    const repoName: string = req.params['repo']
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, { auth: githubAuth })
    const repo: RepoResponse = repositoryToRepoResponse(data)
    const { data: releases } = await axios.get(repo.releases_url.replace('{/id}', ''), { auth: githubAuth })
    repo.releases = releases
    res.send(repo)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }

})

export const githubRouter = router
