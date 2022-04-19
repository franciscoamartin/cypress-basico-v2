Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("John");
  cy.get("#lastName").type("Lennon");
  cy.get("#email").type("john@mail.com");
  cy.get("#open-text-area").type("teste");
  cy.contains('button', 'Enviar').click();
});
