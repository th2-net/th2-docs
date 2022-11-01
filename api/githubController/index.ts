import { Router, Request, Response} from "express";

import axios from "axios";
import {$content} from "@nuxt/content";

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
import {
  RepoResponse,
  repositoryToRepoResponse,
  ContentRepo,
  DashboardResponse
} from "../../apiTypes/github/dashboard-info";
import {getReleasesFeedRepos, getReposFamiliesByTopics} from "./dashboardFunctions";
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

    // @ts-ignore
    const { body: th2Repos }: { slug: string, body: ContentRepo[] } = await $content('th2-repos').fetch()

    const [reposFamilies, releasesFeed] = await Promise.all(
      [getReposFamiliesByTopics(githubAuth), getReleasesFeedRepos(th2Repos, githubAuth)]
    )
    let result: DashboardResponse = {
      releasesFeed: releasesFeed,
      families: reposFamilies
    }
    cache.set('dashboard-info', result)
    res.send(result)
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
