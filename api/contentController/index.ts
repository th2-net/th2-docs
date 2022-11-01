import { Router, Request, Response} from "express";

import {ContentTree} from "../../apiTypes/content/contentTree";
import {cachePagesPaths, generateTree, reversePagePathsCache} from './treeFunctions'
import {getTh2Versions} from "./versionsFunctions";
import {getPage} from "./pageFunctions";
import {$content} from "@nuxt/content";
import {SearchResult} from "../../apiTypes/content/searchResult";

const router: Router = Router()

let pathsCache: Map<string, string>
let reversedPathsCache: Map<string, string>

const updatePathsCacheInDev = async () => {
  if (process.env.NODE_ENV !== 'development') return
  pathsCache = await cachePagesPaths()
  reversedPathsCache = reversePagePathsCache(pathsCache)
}

(async () => {
  pathsCache = await cachePagesPaths()
  reversedPathsCache = reversePagePathsCache(pathsCache)
})()

router.get('/versions', async (req: Request, res: Response) => {
  try {
    res.send(await getTh2Versions())
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

router.get('/tree/:version', async (req: Request, res: Response) => {
  try {
    const version = req.params['version'] || '1-4-7'
    await updatePathsCacheInDev()
    const tree: ContentTree = await generateTree(version.toString(), pathsCache)
    res.send(tree)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

router.get('/routes/:version', async (req: Request, res: Response) => {
  try {
    const version = req.params['version'] || '1-5-4'
    await updatePathsCacheInDev()
    const routes: string[] = Array.from(pathsCache.keys()).filter(r => r.startsWith(`/${version}`))
    res.send(routes)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

router.get('/page', async (req: Request, res: Response) => {
  try {
    const path: string = String(req.query['path'])
    await updatePathsCacheInDev()
    if (!pathsCache.has(path)){
      res.status(404)
      res.send()
      return
    }
    const realPath: string = pathsCache.get(path) || ''
    res.send(await getPage(realPath))
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    const query: string = String(req.query['q'])
    const version: string | undefined = String(req.query['v'] || '1-5-4')
    await updatePathsCacheInDev()
    // @ts-ignore
    const result: SearchResult[] = await $content(`/`, {deep:true})
      .only(['title', 'description', 'path'])
      .where({ extension: '.md', path: { $regex: `/(common)?(versions/${version})?/` } })
      .limit(10)
      .search(query)
      .fetch()
    for (const resultItem of result){
      if (resultItem.path.startsWith('/versions'))
        resultItem.path = reversedPathsCache.get(resultItem.path) || '/'
      else if (resultItem.path.startsWith('/common'))
        resultItem.path = `/${version}/${resultItem.path.replace('/common/', '')}`
    }
    res.send(result)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})
export const contentRouter = router
