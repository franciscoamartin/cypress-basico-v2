it("testa a página da política de privacidade de forma indepedente", function () {
  cy.visit("./src/privacy.html");
  cy.contains("Talking About Testing");
});
