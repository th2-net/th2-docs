import {Repositories, Owner, Repository} from "@saber2pr/types-github-api";
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

export const repoInfoFromJSON = (repo: RepoResponse): RepoResponse => {
  return {
    ...repo,
    releases: repo.releases.map((release: Release): Release => ({
      ...release,
      created_at: new Date(release.created_at),
      published_at: new Date(release.published_at)
    })),
    updated_at: new Date(repo.updated_at),
    created_at: new Date(repo.created_at)
  }
}
