import {randomstring, testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'https://th2.dev'
const sitemapPath = '/sitemap.xml'

describe('Check docs website production', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })

  it('Website pages should not contain JS errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
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
      cy.visit(path)
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('Links should be correct', () => {
    testAllPagesFromSitemap((url) => {
      testLinksOnPage(url)
    }, hostPath, sitemapPath)
  })
})
