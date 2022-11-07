import {testAllPagesFromSitemap} from "../support/utils";

const hostPath = 'http://localhost:8080'
const sitemapPath = '/sitemap.dev.json'

describe('Check docs website in development mode', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })

  it('All pages from sitemap should not contain errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        .wait(1000)
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })
})
