/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulario', function() {
        const longText = "Colocando um teste para amadurecer a informacao Colocando um teste para amadurecer a informacao Colocando um teste para amadurecer a informacao Colocando um teste para amadurecer a informacao"

        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('renatorock3@hotmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('renatorock3@hotmail,com')
        cy.get('#open-text-area').type("Testando")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('.error > strong').should('have.text', 'Valide os campos obrigatórios!')

    })

    it.only('campo telefone continua vazio quando preenchido com o valor não númerico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
})