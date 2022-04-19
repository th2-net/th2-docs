import {ContentNode} from "../../apiTypes/content/contentTree";
import {$content} from "@nuxt/content";
import {getTh2Versions} from "./versionsFunctions";
import * as path from "path";

const highestLevel = 3
export const nuxtCommonPagesNodes: ContentNode[] = [
  { path: '/boxes/dashboard', title: 'Dashboard'}
]

export const cachePagesPaths = async (): Promise<Map<string, string>> => {
  const pathsCache = new Map<string, string>()
  const th2Versions = await getTh2Versions()

  // Get all paths from versions folder
  const versionedPagesPaths: string[] = (
    await $content('/versions', {deep: true})
    .only(['path'])
    .where({ extension: '.md', hide: { $ne: true } })
    .fetch()
  ).map((page: any) => page.path)
  // Get all paths from common folder
  const commonPagesPaths: string[] = (
    await $content('/common', {deep: true})
      .only(['path'])
      .where({ extension: '.md', hide: { $ne: true } })
      .fetch()
  ).map((page: any) => page.path)

  // Process and add paths from versions folder to cache
  for (const path of versionedPagesPaths){
    let virtualPath = path
      .replace('/versions', '')
      .replace('/_index', '')
    if (virtualPath)
      pathsCache.set(virtualPath, path)
  }
  // Process and add paths from common folder to cache
  for (const path of commonPagesPaths){
    let virtualPath = path
      .replace('/common', '')
      .replace('/_index', '')
    if (virtualPath)
      for (const v of th2Versions)
        pathsCache.set(v.content_dir.replace('/versions', '') + virtualPath, path)
  }
  return pathsCache
}

export const reversePagePathsCache = (cache: Map<string, string>): Map<string, string> => {
  const reversedCache = new Map<string, string>()
  for (const [key, value] of cache )
    reversedCache.set(value, key)
  return reversedCache
}

export const constructPagesTree = (pages: ContentNode[]): ContentNode[] => {
  const processedPages: ContentNode[] = pages
    .map((page: ContentNode) => {
      return {...page, children: [] }
    })
  // Список секций верхнего уровня
  let sections = processedPages.filter(page => {
    const pathFolders = page.path.split('/')
    return pathFolders.length === highestLevel
  })
  function buildNextLevel(allPages: ContentNode[], higherSections: ContentNode[], level: number = 1){
    // Находим все страницы на уровень ниже
    let lowerSections = allPages.filter(page => {
      const pathFolders = page.path.split('/')
      return pathFolders.length === (level + 1)
    })
    // Проверяем, есть ли страницы на уровень ниже
    if (lowerSections.length === 0)
      return;
    // Присваиваем дочерние страницы
    higherSections.forEach(section => {
      const sectionNestCount: number = section.path.split('/').length
      section.children = lowerSections
        .filter(lowerSection =>
          lowerSection.path.includes(section.path) &&
          lowerSection.path.split('/').length === sectionNestCount + 1
        )
    })

    buildNextLevel(processedPages, lowerSections, level + 1)
  }
  buildNextLevel(processedPages, sections, highestLevel)
  return sections
}

export const generateTree = async (version: string, pathsCache: Map<string, string>) => {
  const versionedPaths: string[] = Array
    .from(pathsCache.keys())
    .filter(p => p.startsWith(`/${version}`))
  const nodesRaw: { weight: number, node: ContentNode }[] = await Promise
    .all(versionedPaths.map( async (versionedPath): Promise<{ weight: number, node: ContentNode }> => {
      const realPath = pathsCache.get(versionedPath) || ''
      const contentPage: any = await $content(realPath).only(['title', 'weight']).fetch()
      return {
        weight: contentPage.weight,
        node: {
          path: versionedPath,
          title: contentPage.title
        }
      }
    }))
  const nodesPlain: ContentNode[] = nodesRaw
    .sort((a, b) => {
      if (a.weight < b.weight) return -1
      if (a.weight > b.weight) return 1
      return 0
    })
    .map(n => n.node)
  for (const node of nuxtCommonPagesNodes)
    nodesPlain.unshift({ title: node.title, path: `/${version}${node.path}` })
  return constructPagesTree(nodesPlain)
}
