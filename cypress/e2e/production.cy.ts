import {randomstring, testAllPagesFromSitemap, testLinksOnPage} from "../support/utils";

const hostPath = 'https://th2.dev'
const sitemapPath = '/sitemap.xml'

describe('Check specific files', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })
})

describe('Uncaught exceptions', () => {
  context('Website pages should not contain JS errors', () => {
    testAllPagesFromSitemap((path: string) => {
      it(`Page ${path} should not contain JS errors`, () => {
        cy.visit(path)
          // Let JavaScript start to catch possible errors
          .wait(1000)
      })
    }, 'prod-local')
  })
})

describe('Content tests', () => {
  context('Links should be correct', () => {
    testAllPagesFromSitemap((url) => {
      it(`Link on page '${url}' should be correct`, () => {
        // Ignore JS errors
        Cypress.on('uncaught:exception', () => false)
        testLinksOnPage(url)
      })
    }, 'prod-local')
  })
})

describe('Error 404 tests', () => {
  context('All pages from sitemap should not contain error 404 flag', () => {
    testAllPagesFromSitemap((path: string) => {
      it(`Page '${path}' should not contains error 404  flag`, () => {
        cy.visit(path)
          .get('#error-404-flag')
          .should('not.exist')
      })
    }, 'prod-local')
  })

  it('/404/ page should return status code 200', () => {
    cy.request(hostPath + '/404/').its('status').should('equal', 200)
  })
})
