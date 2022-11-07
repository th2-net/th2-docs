import {randomstring, testAllPagesFromSitemap} from "../support/utils";

const hostPath = 'https://th2.dev'
const sitemapPath = '/sitemap.xml'

describe('Check docs website production', () => {
  it('Sitemap should exist', () => {
    cy.request(hostPath + sitemapPath)
  })

  it('All pages from sitemap should not contain errors', () => {
    testAllPagesFromSitemap((path: string) => {
      cy.visit(path)
        // Let JavaScript start to catch possible errors
        .wait(1000)
        // Page should not contain error 404 marker
        .get('#error-404-flag')
        .should('not.exist')
    }, hostPath, sitemapPath)
  })

  it('Links should be correct', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    testAllPagesFromSitemap((path) => {
      cy.visit(path)
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
    }, hostPath, sitemapPath)
  })
})
