/// <reference types ="cypress"/>

describe('Cadastrar dispositivo',() => {
    it('Cadastrar dispositivo',() => {
        const dataAtual = new Date().toISOString().slice(0 ,10)

        const body = require('../fixtures/cadastro_device_sucesso.json')

        cy.CadastrarDevice(body)
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

        cy.CadastrarDevice(body)
            .then((response)=>{
                expect(response.status).equal(400)
                expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})