import {randomstring, testAllPagesFromSitemap} from "../support/utils";

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

  it('Error 404 page should contain error marker', () => {
    const testPaths: string[] = ['/404']
    for (let i = 0; i < 10; i++){
      testPaths.push(`/${randomstring(20)}`)
    }
    for (let path of testPaths){
      cy.visit(hostPath + path)
        .wait(1000)
        .get('#error-404-flag')
        .should('exist')
    }
  })
})
