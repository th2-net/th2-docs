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
    it('Find all broken links', () => {
        cy.visit('http://localhost:8080/1-7/fundamentals/')
        cy.get('a').each(link => {
            if (link.prop('href'))
            cy.request({
                url: link.prop('href'),
                failOnStatusCode: true
            })
            checkIfEleExists('#error-404-flag')
            cy.log( link.prop('href'))
        })
    })
})
