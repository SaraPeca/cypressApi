/// <reference types ="cypress"/>

describe('Atualizar dispositivo',() =>{
    const dataAtual = new Date().toISOString().slice(0 ,10)
    it('Atualizar dispositivo',() =>{
       
        const body_post = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }  
         }

         const body_put = {
            "name": "Apple Iphone Pro 16",
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
            body: body_post
        }).as('postDeviceResult')
       
        cy.get('@postDeviceResult')
            .then((response_post)=>{
                expect(response_post.status).equal(200)
                expect(response_post.body.id).not.empty
        
                const device_id = response_post.body.id
                
                cy.request({
                    method: 'PUT',
                    url: `/objects/${device_id}`,
                    failOnStatusCode: false,
                    body: body_put
                }).as('putDeviceResult')
        
            //validações
                cy.get('@putDeviceResult')
                    .then((response_put)=>{
                        expect(response_put.status).equal(200)
                        expect(response_put.body.name).equal(body_put.name)
                        expect(response_put.body.updatedAt.slice(0 ,10)).equal(dataAtual)
                    })
            })        

    })

    it('Atualizar sem informar o body',() =>{
        const body_post = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }  
         }

         const body_put = ''

         cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            failOnStatusCode: false,
            body: body_post
        }).as('postDeviceResult')
       
        cy.get('@postDeviceResult')
            .then((response_post)=>{
                expect(response_post.status).equal(200)
                expect(response_post.body.id).not.empty
        
                const device_id = response_post.body.id
                
                cy.request({
                    method: 'PUT',
                    url: `https://api.restful-api.dev/objects/${device_id}`,
                    failOnStatusCode: false,
                    body: body_put
                }).as('putDeviceResult')
        
            //validações
                cy.get('@putDeviceResult')
                    .then((response_put)=>{
                        expect(response_put.status).equal(400)
                        expect(response_put.body.error)
                            .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
                    })
            })
    })

    it('Atualizar dispositivo inexistente',() =>{
        const body_put = {
            "name": "Apple Iphone Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }  
         }

        const device_id = 'invalidId'
                
                cy.request({
                    method: 'PUT',
                    url: `/objects/${device_id}`,
                    failOnStatusCode: false,
                    body: body_put
                }).as('putDeviceResult')
        
            //validações
                cy.get('@putDeviceResult')
                    .then((response_put)=>{
                        expect(response_put.status).equal(404)
                        expect(response_put.body.error).equal(`The Object with id = ${device_id} doesn't exist. Please provide an object id which exists or generate a new Object using POST request and capture the id of it to use it as part of PUT request after that.`)
                    })   
    })
})