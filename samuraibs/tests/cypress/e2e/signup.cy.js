it("deve cadastrar um novo usuário", () => {
  const name = "Test User";
  const email = "test@gmail.com";
  const password = "pwd123";

  cy.visit("/signup");

  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Senha"]').type(password)
});
