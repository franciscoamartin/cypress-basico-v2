/// <reference types="Cypress" />

describe("Central de Atendimento ao cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o titulo da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatorios e envia o formulario", function () {
    const longText = "Test Test Test Test Test Test"
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Lennon");
    cy.get("#email").type("john@mail.com");
    cy.get("#open-text-area").type(longText, {delay: 0});
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });
});
