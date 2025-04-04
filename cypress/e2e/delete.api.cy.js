/// <reference types ="cypress"/>

describe('Excluir dispositivo',() =>{
    it('Excluir dispositivo',() =>{
       
        const body = require('../fixtures/cadastro_device_sucesso.json')

         cy.CadastrarDevice(body)
            .then((response_post)=>{
                expect(response_post.status).equal(200)
                expect(response_post.body.id).not.empty
        
                const device_id = response_post.body.id
                cy.ExcluirDevice(device_id)
                    .then((response_delete)=>{
                        expect(response_delete.status).equal(200)
                        expect(response_delete.body.message).equal(`Object with id = ${device_id} has been deleted.`)
                    })
            })        

    })

    it('Excluir dispositivo inválido', () => {
        const device_id = 'invalidID'
        cy.ExcluirDevice(device_id)
                    .then((response_delete)=>{
                        expect(response_delete.status).equal(404)
                        expect(response_delete.body.error).equal(`Object with id = ${device_id} doesn't exist.`)
                    })
    })
})