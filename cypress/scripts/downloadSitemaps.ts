import axios from 'axios'
import * as X2JS from 'x2js'
import * as fs from 'fs'

type SitemapNode = {
  path: string
}

async function getSitemap({
                            hostPath = 'http://localhost:8080',
                            sitemapPath = '/sitemap.xml'
                          }): Promise<SitemapNode[]>{
  try {
    const {data: response} = await axios.get(hostPath + sitemapPath)
    if (sitemapPath.endsWith('.json')) {
      const sitemap: SitemapNode[] = response
      return sitemap
    } else if (sitemapPath.endsWith('.xml')) {
      const sitemap = response
      // @ts-ignore
      return new X2JS().xml2js(sitemap)?.urlset?.url.map(link => ({path: link.loc}))
    }
    return []
  } catch (e) {
    return []
  }

}

async function main(){
  const devSitemap = await getSitemap({
    hostPath: 'http://localhost:8080',
    sitemapPath: '/sitemap.dev.json'
  })
  const prodSitemap = await getSitemap({
    hostPath: 'http://localhost:8080',
    sitemapPath: '/sitemap.xml'
  })
  const prodLocalSitemap = await getSitemap({
    hostPath: 'https://th2.dev',
    sitemapPath: '/sitemap.xml'
  })
  fs.writeFileSync('./cypress/fixtures/sitemap.dev.json', JSON.stringify(devSitemap), { encoding: 'utf-8' })
  fs.writeFileSync('./cypress/fixtures/sitemap.prod.json', JSON.stringify(prodSitemap), { encoding: 'utf-8' })
  fs.writeFileSync('./cypress/fixtures/sitemap.prod.local.json', JSON.stringify(prodLocalSitemap), { encoding: 'utf-8' })
}

main()
