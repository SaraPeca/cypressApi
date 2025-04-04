/// <reference types ="cypress"/>

describe('Excluir dispositivo',() =>{
    it('Excluir dispositivo',() =>{
       
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }

         cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')
        cy.get('@postDeviceResult')
            .then((response_post)=>{
                expect(response_post.status).equal(200)
                expect(response_post.body.id).not.empty
        
                const device_id = response_post.body.id
                cy.request({
                    method: 'DELETE',
                    url: `/objects/${device_id}`,
                    failOnStatusCode: false,
                }).as('deleteDeviceResult')
        
            //validações
                cy.get('@deleteDeviceResult')
                    .then((response_delete)=>{
                        expect(response_delete.status).equal(200)
                        expect(response_delete.body.message).equal(`Object with id = ${device_id} has been deleted.`)
                    })
            })        

    })
})