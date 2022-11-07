import {randomstring, testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'http://localhost:8080'
const sitemapPath = '/sitemap.dev.json'

describe('Check docs website in development mode', () => {
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

  it('All pages from sitemap should not error 404 flag', () => {
    // Ignore JS errors
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        // Wait to not cause abortion
        .wait(100)
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('Links should be correct', () => {
    testAllPagesFromSitemap((url) => {
      testLinksOnPage(url)
    }, hostPath, sitemapPath)
  })

  it('Not existing pages should return status code 404 except /404', () => {
    cy.request(hostPath + '/404/').its('status').should('equal', 200)
    const testPaths: string[] = []
    for (let i = 0; i < 10; i++){
      testPaths.push(`/${randomstring(20)}`)
    }
    for (let path of testPaths){
      cy.request(hostPath + path).its('status').should('equal', 404)
    }
  })
})
