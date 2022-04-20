/// <reference types="Cypress" />

describe("Central de Atendimento ao cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o titulo da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatorios e envia o formulario", function () {
    const longText = "Test Test Test Test Test Test";
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Lennon");
    cy.get("#email").type("john@mail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Lennon");
    cy.get("#email").type("john@mail,com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchdio com valor não numérico", function () {
    cy.get("#phone").type("ababababababa").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Lennon");
    cy.get("#email").type("john@mail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("John")
      .should("have.value", "John")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Lennon")
      .should("have.value", "Lennon")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("john@mail.com")
      .should("have.value", "john@mail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um (youtube) produto por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um (mentoria) produto por seu valor", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um (blog) produto por seu indice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento feedback", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxs e depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });
});
