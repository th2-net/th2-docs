import axios from 'axios'

type SitemapNode = {
  path: string
}

describe('Check all docs pages', async () => {
  it('Sitemap exists', () => {
    cy.request('http://localhost:8080/sitemap.dev.json')

  })
  const sitemap = await axios.get<SitemapNode[]>('http://localhost:8080/sitemap.dev.json')
  for (let sitemapNode of sitemap.data){
    //cy.log(sitemapNode.path) 
  }

  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
})
