type SitemapNode = {
  path: string
}

export function testAllPagesFromSitemap(testCallback: (pagePath: string) => unknown,
                             hostPath: string = 'http://localhost:8080',
                             sitemapPath: string = '/sitemap.dev.json') {
  cy.request(hostPath + sitemapPath)
    .then(response => {
      if (sitemapPath.endsWith('.json')) {
        const sitemap: SitemapNode[] = response.body
        for (let sitemapNode of sitemap){
          testCallback(hostPath + sitemapNode.path)
        }
      } else if (sitemapPath.endsWith('.xml')) {
        const urls = Cypress.$(response.body)
          .find("loc")
          .toArray()
          .map((el) => el.innerText)
        for (let url of urls){
          testCallback(url)
        }
      }

    })
}

export function randomstring(length: number): string{
  const chars = Array
    .from(Array(26))
    .map((e, i) => i + 97)
    .map(charCode => String.fromCharCode(charCode))
  chars.push('/')
  const stringBuilder: string[] = []
  for (let i = 0; i < length; i++){
    const randomChar = chars[Math.floor(Math.random() * chars.length)]
    stringBuilder.push(randomChar)
  }
  return stringBuilder.join('')
}

export function testLinksOnPage(url: string){
  cy.visit(url)
  cy.log(url)
  // a element without href is error
  cy.get('a').should('have.attr', 'href')
  cy.get('a')
    .each(link => {
      const href: string = link.prop('href')
      // We can't check links which are not leading to http requests
      // LinkedIn server returns status 999 for some reason
      // YouTube produces a lot of new links
      if (href.startsWith('http') && !href.includes('www.linkedin.com') && !href.includes('youtube.com')){
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: true
        })
      }
    })
}

export function checkIfEleExists(ele: string): Promise<void>{
  return new Promise((resolve,reject)=>{
    /// here if  ele exists or not
    cy.get('body').find( ele ).its('length').then(res=>{
      if(res === 0){
        //// do task that you want to perform
        cy.get(ele).select('100').wait(2000);
        resolve();
      }else{
        reject();
      }
    });
  })
}
