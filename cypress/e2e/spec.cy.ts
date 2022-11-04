type SitemapNode = {
  path: string
}

describe('Check all docs pages', () => {
  let sitemap: SitemapNode[] = []
  it('Sitemap exists', () => {
    cy.request('http://localhost:8080/sitemap.dev.json')
        .then(response => {
          sitemap = response.body
        })
  })

  it('Visit all pages', () => {
    // Wait for sitemap
    cy.wait(1000)
    cy.log(JSON.stringify(sitemap, null, 2))
    for (let sitemapNode of sitemap){
      cy.visit('http://localhost:8080' + sitemapNode.path)
    }
    cy.visit('http://localhost:8080/404')

  })
})
