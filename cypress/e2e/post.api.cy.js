/// <reference types ="cypress"/>

describe('Cadastrar dispositivo',() => {
    it('Cadastrar dispositivo',() => {
        const dataAtual = new Date().toISOString().slice(0 ,10)

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

    //validações
        cy.get('@postDeviceResult')
            .then((response)=>{
                expect(response.status).equal(200)
                expect(response.body.id).not.empty
                expect(response.body).not.empty
                expect(response.body.createdAt.slice(0 ,10)).equal(dataAtual)

                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body.data.year).equal(2019)
                expect(response.body.data.price).equal(1849.99)
                expect(response.body.data['CPU model']).equal('Intel Core i9')
                expect(response.body.data['Hard disk size']).equal('1 TB')

            })

    })

    it('Cadastrar dispositivo sem dados', () => {
        const body = ''

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')

    //validações
        cy.get('@postDeviceResult')
            .then((response)=>{
                expect(response.status).equal(400)
                expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})