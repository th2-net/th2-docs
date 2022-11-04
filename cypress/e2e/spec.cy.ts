type SitemapNode = {
  path: string
}

describe('Check all docs pages', () => {
  it('Sitemap exists', () => {
    cy.request('http://localhost:8080/sitemap.dev.json')
  })

  it('Visit all pages', () => {
    let sitemap: SitemapNode[] = []
    cy.request('http://localhost:8080/sitemap.dev.json')
        .then(response => {
          sitemap = response.body
          for (let sitemapNode of sitemap){
            cy.visit('http://localhost:8080' + sitemapNode.path)
          }
          cy.visit('http://localhost:8080/404')
        })
  })
})
