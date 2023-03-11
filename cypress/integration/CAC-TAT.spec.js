/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('Preenche os campos obrigatórios e envia o formulario', function() {

        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('renatorock3@hotmail.com')
        cy.get('#open-text-area').type('Colocando um teste para amadurecer a informacao')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.')
    })
})