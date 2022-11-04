import axios from 'axios'

type SitemapNode = {
  path: string
}

describe('Check all docs pages', async () => {
  it('Sitemap exists', () => {
    cy.request('http://localhost:8080/sitemap.dev.json')

  })
  const sitemap = await axios.get<SitemapNode[]>('http://localhost:8080/sitemap.dev.json')


  it('Visit all pages', () => {
    for (let sitemapNode of sitemap.data){
      it(`visit ${sitemapNode.path}`, () => {
        cy.visit('http://localhost:8080' + sitemapNode.path) 
      })
      
    }
    cy.visit('http://localhost:8080/404')
    
  })
})
