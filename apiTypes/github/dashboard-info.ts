import {Repositories, Owner, Repository} from "@saber2pr/types-github-api";
export type ContentRepo = {
  Name: string,
  Type: string,
  Family: string,
  Language: string
}
export type CustomRepoInfo = {
  info_topics: string[]
}
export type DashboardResponse = {
  families: RepoGroupByFamily[],
  releasesFeed: RepoResponse[]
}
export type RepoGroupByFamily = {
  family: string,
  repos: RepoResponse[]
}
export type Release = {
  id: number,
  name: string,
  html_url: string,
  author: Owner,
  tag_name: string,
  prerelease: boolean,
  created_at: Date,
  published_at: Date,
  body: string
}

export type UserResponse = {
  id: number,
  login: string,
  avatar_url: string,
  url: string,
  html_url: string,
  type: string
}

export type RepoResponse = {
  id: number,
  custom_info?: CustomRepoInfo,
  name: string,
  full_name: string,
  owner: UserResponse,
  html_url: string,
  url: string,
  description: string | null,
  releases_url: string,
  language: string,
  releases: Release[],
  created_at: Date,
  updated_at: Date
}

export const ownerToUserResponse = (user: Owner): UserResponse => {
  return {
    id: user.id,
    login: user.login,
    type: user.type,
    url: user.url,
    avatar_url: user.avatar_url,
    html_url: user.html_url
  }
}

export const repositoryToRepoResponse = (repo: Repository): RepoResponse => {
  return {
    id: repo.id,
    created_at: new Date(repo.created_at),
    description: repo.description,
    full_name: repo.full_name,
    url: repo.url,
    name: repo.name,
    html_url: repo.html_url,
    language: repo.language,
    owner: ownerToUserResponse(repo.owner),
    releases_url: repo.releases_url,
    updated_at: new Date(repo.updated_at),
    releases: []
  }
}

export const dashboardInfoFromJSON = (db: DashboardResponse): DashboardResponse => {
  return {
    ...db,
    releasesFeed: db.releasesFeed.map((repo: RepoResponse): RepoResponse => ({
      ...repo,
      releases: repo.releases.map((release: Release): Release => ({
        ...release,
        created_at: new Date(release.created_at),
        published_at: new Date(release.published_at)
      })),
      updated_at: new Date(repo.updated_at),
      created_at: new Date(repo.created_at)
    }))
  }
}
