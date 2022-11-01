describe('Check all docs pages', () => {
  it('Sitemap exists', () => {
    cy.request('http://localhost:8080/sitemap.xml')
  })
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
