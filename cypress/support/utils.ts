type SitemapNode = {
  path: string
}

export function testAllPagesFromSitemap(testCallback: (pagePath: string) => unknown,
                             sitemapType: 'dev' | 'prod' | 'prod-local') {
  const sitemap: SitemapNode[] = sitemapType === "dev" ? require('../fixtures/sitemap.dev.json') :
    sitemapType === "prod" ? require('../fixtures/sitemap.prod.json'): require('../fixtures/sitemap.prod.local.json')
  for (let sitemapNode of sitemap){
    testCallback(sitemapNode.path)
  }
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
      if (href.startsWith('mailto') || href.startsWith('tel')) return
      expect(
        href.startsWith('http') || href.split('#')[0].endsWith('/'),
        `[${href}] Relative link should end with '/'`).to.be.eq(true)
      // We can't check links which are not leading to http requests
      // LinkedIn server returns status 999 for some reason
      // YouTube produces a lot of new links
      if (href.startsWith('http') && !href.includes('www.linkedin.com') && !href.includes('youtube.com')){
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: true,
          retryOnStatusCodeFailure: true,
          retryOnNetworkFailure: true
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
