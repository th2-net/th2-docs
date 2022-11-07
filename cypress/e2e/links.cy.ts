function checkIfEleExists(ele: string): Promise<void>{
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


describe('Broken Link', () => {
    beforeEach(() => {
        cy.viewport(1280, 1000)
    })
    it('Links are correct', () => {
        cy.visit('http://localhost:8080/1-7/fundamentals/')
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
    })
})
