describe('Broken Link', () => {
  beforeEach(() => {
    cy.viewport(1280, 1000)
  })
  it('Links should be correct', () => {
    cy.visit('http://localhost:8080/1-7/fundamentals/')
    // a element without href is error
    cy.get('a').should('have.attr', 'href')
    cy.get('a')
      .each(link => {
        const href: string = link.prop('href')
        // We can't check links which are not leading to http requests
        // LinkedIn server returns status 999 for some reason
        if (href.startsWith('http') && !href.includes('www.linkedin.com')){
          cy.request({
            url: link.prop('href'),
            failOnStatusCode: true
          })
        }
      })
  })
})
