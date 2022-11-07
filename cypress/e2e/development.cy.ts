import {randomstring, testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'http://localhost:8080'
const sitemapPath = '/sitemap.dev.json'

describe('Check specific files', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })
})

describe("Uncaught exceptions", () => {
  it('Website pages should not contain JS errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        // Let JavaScript start to catch possible errors
        .wait(1000)
    }, hostPath, sitemapPath)
  })
})

describe('Content tests', () => {
  // Ignore JS errors
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  it('Links should be correct', () => {
    testAllPagesFromSitemap((url) => {
      testLinksOnPage(url)
    }, hostPath, sitemapPath)
  })
})

describe('Error 404 tests', () => {
  it('All pages from sitemap should not error 404 flag', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        // Wait to not cause abortion
        .wait(100)
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('Not existing pages should contain error marker', () => {
    const testPaths: string[] = ['/404']
    for (let i = 0; i < 10; i++){
      testPaths.push(`/${randomstring(20)}`)
    }
    for (let path of testPaths){
      cy.request(hostPath + path)
        .wait(100)
        .get('#error-404-flag')
        .should('exist')
    }
  })
})
