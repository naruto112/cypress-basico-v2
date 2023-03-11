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
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('renatorock3@hotmail,com')
        cy.get('#open-text-area').type("Testando")
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
        
    })

    it('campo telefone continua vazio quando preenchido com o valor não númerico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Souza')
        cy.get('#email').type('renatorock3@hotmail,com')
        cy.get('#phone-checkbox').check()        
        cy.get('#open-text-area').type("Testando")
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Renato')
            .should('have.value', 'Renato')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Souza')
            .should('have.value', 'Souza')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('renatorock3@hotmail,com')
            .should('have.value', 'renatorock3@hotmail,com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11987474136')
            .should('have.value', '11987474136')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
             .select('YouTube')
             .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
             .select('mentoria')
             .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
             .select(1)
             .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
              .check()
              .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })


    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('cypress/fixtures/CERTIFICADO.pdf')
                .should(function($input) {
                    expect($input[0].files[0].name).to.eq('CERTIFICADO.pdf')
                })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('cypress/fixtures/CERTIFICADO.pdf', { action: 'drag-drop' })
                .should(function($input) {
                    expect($input[0].files[0].name).to.eq('CERTIFICADO.pdf')
                })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('CERTIFICADO.pdf').as('PDF')
        cy.get('input[type="file"]')
            .selectFile('@PDF')
            .should(function($input) {
                expect($input[0].files[0].name).to.eq('CERTIFICADO.pdf')
            })
    })

})