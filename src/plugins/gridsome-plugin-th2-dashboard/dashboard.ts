import * as fs from 'fs'
import { RepositoryItem } from '../types/gridsome/collections/repositories';

export function getReleasesFeedRepos(repositories: RepositoryItem[]){
  const filteredRepos = repositories.filter((repo) => repo.releases?.length)
  // Sort - repos with newest releases are first
  const sortedRepos = filteredRepos.sort((a, b) => {
    const aPublished = a.releases[0].published_at ?? new Date(0)
    const bPublished = b.releases[0].published_at ?? new Date(0)
    if (aPublished > bPublished) {
      return -1;
    }
    if (aPublished < bPublished) {
      return 1;
    }
    // a = b
    return 0;
  })
  return sortedRepos
}

export function getReposFamiliesByTopics(repositories: RepositoryItem[], allTopics: string[] = []) {
  const reposWithTopics = repositories.filter(repo => repo?.topics?.length)
  const GROUPS = ['th2-infra', 'th2-core', 'th2-check1', 'th2-act', 'th2-conn', 'th2-check2', 'th2-act-ui']
  const infoTopics = allTopics.filter(t => !GROUPS.includes(t))
  return GROUPS.map((group) => {
    return {
      family: group,
      repos: reposWithTopics
          .filter(r => r.topics.some(topic => topic.id === group))
          .map(r => {
            return {
              ...r,
              custom_info: { info_topics: infoTopics.filter(t => r.topics.some(topic => topic.id === t)) }
            }
          }
      )
    }
  })
}

export function saveDashboardData(data: any){
  if (!fs.readdirSync('./').includes('temp'))
    fs.mkdirSync('./temp')
  fs.writeFileSync('./temp/dashboard.json', JSON.stringify(data, null, 2), "utf-8")
}
