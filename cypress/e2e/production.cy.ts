import {randomstring, testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'https://th2.dev'
const sitemapPath = '/sitemap.xml'

describe('Check specific files', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })
})

describe('Uncaught exceptions', () => {
  it('Website pages should not contain JS errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        // Let JavaScript start to catch possible errors
        .wait(1000)
    }, hostPath, sitemapPath)
  })
})

describe('Content tests', () => {
  it('Links should be correct', () => {
    // Ignore JS errors
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    testAllPagesFromSitemap((url) => {
      testLinksOnPage(url)
    }, hostPath, sitemapPath)
  })
})

describe('Error 404 tests', () => {
  it('All pages from sitemap should not contain error 404 flag', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('/404/ page should return status code 200', () => {
    cy.request(hostPath + '/404/').its('status').should('equal', 200)
  })
})
