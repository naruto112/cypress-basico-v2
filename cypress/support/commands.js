Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Renato')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('renatorock3@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})