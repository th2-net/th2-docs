import {processSearchMixin} from "../mixins/processSearch";
import {cachePagesPaths, nuxtCommonPagesNodes} from "../api/contentController/treeFunctions";
import {$content} from "@nuxt/content";
import {getTh2Versions} from "../api/contentController/versionsFunctions";

export const getRoutes = async () => {
  const cache = await cachePagesPaths()
  const th2Versions = await getTh2Versions()
  const links = await Promise.all(
    Array.from(cache.keys()).map(async (path) => {
      const pageInfo = await $content(cache.get(path)).only(['updatedAt']).fetch()
      return {
        url: path,
        lastmod: pageInfo.updatedAt
      }
    })
  )
  for (const v of th2Versions)
    for (const page of nuxtCommonPagesNodes)
      links.push({
        url: v.content_dir.replace('/versions', '') + page.path
      })
  return links
}
