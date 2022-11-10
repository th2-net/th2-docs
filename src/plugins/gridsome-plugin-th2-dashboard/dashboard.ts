import * as fs from 'fs'

export function getReleasesFeedRepos(repositories: any){
  const filteredRepos = repositories.filter((repo: any) => repo.releases?.length)
  // Sort - repos with newest releases are first
  const sortedRepos = filteredRepos.sort((a: any, b: any) => {
    if (a.releases[0].published_at > b.releases[0].published_at  ) {
      return -1;
    }
    if (a.releases[0].published_at < b.releases[0].published_at) {
      return 1;
    }
    // a = b
    return 0;
  })
  return sortedRepos
}

export function getReposFamiliesByTopics(repositories: any, allTopics = []) {
  const reposWithTopics = repositories.filter((repo: any) => repo?.topics?.length)
  const GROUPS = ['th2-infra', 'th2-core', 'th2-check1', 'th2-act', 'th2-conn', 'th2-check2', 'th2-act-ui']
  const infoTopics = allTopics.filter(t => !GROUPS.includes(t))
  return GROUPS.map((group) => {
    return {
      family: group,
      repos: reposWithTopics
          .filter((r: any) => r.topics.includes(group))
          .map((r: any) => {
            r.custom_info = { info_topics: infoTopics.filter(t => r.topics.includes(t)) }
            return r
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

module.exports = {
  getReleasesFeedRepos,
  getReposFamiliesByTopics,
  saveDashboardData
}