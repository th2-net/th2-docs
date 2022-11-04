type SitemapNode = {
  path: string
}

const testPage = (url:string) => {
  cy.visit(url)
    .wait(1000)
    .get('#error-404-flag')
    .should('not.exist')
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
            testPage('http://localhost:8080' + sitemapNode.path)
            
          }
          testPage('http://localhost:8080/404')
        })
  })
})
