// import { Octokit } from 'octokit'
import axios from 'axios'
import {CRs} from "./crs-to-series";
const YAML = require('js-yaml')

type Branches = any // GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listBranches>
type Content = any // GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>

export async function repoListBranches(options: {
  owner: string,
  repo: string
}){
  const {data} = await axios.get(`https://api.github.com/repos/${options.owner}/${options.repo}/branches`)
  return data.map((branch: any): string => branch.name)
}

export async function repoGetContent(options: {
  owner: string,
  repo: string,
  path: string,
  ref: string
}){
  const {data} = await axios.get(`https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
    {
      params: {
        ref: options.ref
      }
    })
  return data as Content
}

export async function fetchCRs(repo: {
  owner: string
  name: string
}, selectedBranch: string = 'master'){
  const crs: CRs = {
    boxes: [] ,
    core: [] ,
    dictionaries: [] ,
    links: []
  }
  try {
    const content = await repoGetContent({
      owner: repo.owner,
      repo: repo.name,
      path: '',
      ref: selectedBranch
    })
    if (!Array.isArray(content)) return crs
    const crFolders = content
      .filter(item => item.type === 'dir' && ['boxes', 'core', 'dictionaries', 'links'].includes(item.name))
    const getYamlFiles = async (path: string) => {
      const content = await repoGetContent({
        owner: repo.owner,
        repo: repo.name,
        path: path,
        ref: selectedBranch
      })
      if (!Array.isArray(content)) return []
      const yamlPromises = content
        .filter(item => item.type === 'file')
        .filter(item => item.name.endsWith('.yaml') || item.name.endsWith('.yml'))
        .filter(item => item.download_url)
        .map(async (item) => {
          const {data} = await axios.get(item.download_url as string)
          return data
        })
      const yamls = await Promise.all(yamlPromises)
      return yamls.map(yaml => YAML.load(yaml))
    }
    for (let folder of crFolders){
      if (folder.name === 'boxes')
        crs.boxes = await getYamlFiles(folder.path)
      if (folder.name === 'core')
        crs.core = await getYamlFiles(folder.path)
      if (folder.name === 'dictionaries')
        crs.dictionaries = await getYamlFiles(folder.path)
      if (folder.name === 'links')
        crs.links = await getYamlFiles(folder.path)
    }
    return crs
  } catch (e){
    return crs
  }
}
