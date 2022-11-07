import {testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'http://localhost:8080'
const sitemapPath = '/sitemap.xml'
function getLocalUrl(url: string){
  return url.replace('https://th2.dev', 'http://localhost:8080')
}

describe('Check local docs website production', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })

  it('Website pages should not contain JS errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(getLocalUrl(path))
        // Let JavaScript start to catch possible errors
        .wait(1000)
    }, hostPath, sitemapPath)
  })

  it('All pages from sitemap should not contain error 404 flag', () => {
    // Ignore JS errors
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    testAllPagesFromSitemap((path: string) => {
      cy.visit(getLocalUrl(path))
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('Links should be correct', () => {
    testAllPagesFromSitemap((url) => {
      testLinksOnPage(getLocalUrl(url))
    }, hostPath, sitemapPath)
  })
})
