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
        // Let JavaScript start to catch possible errors
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
        .wait(100)
        .get('#error-404-flag')
        .should('exist')
    }
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
