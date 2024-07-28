describe("cadastro", () => {
  it("deve cadastrar um novo usuário", () => {
    const name = "Test User";
    const email = "test@gmail.com";
    const password = "pwd123";

    cy.task("removeUser", email).then(function (result) {
      console.log(result);
    });

    cy.visit("/signup");

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);

    cy.contains("button", "Cadastrar").click();

    cy.get(".toast")
      .should("be.visible")
      .find("p")
      .should(
        "have.text",
        "Agora você pode fazer seu login no Samurai Barbershop!"
      );
  });

  it("deve exibir email já cadastrado", () => {
    const name = "Test User";
    const email = "test@gmail.com";
    const password = "pwd123";

    cy.visit("/signup");

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);

    cy.contains("button", "Cadastrar").click();

    cy.get(".toast")
      .should("be.visible")
      .find("p")
      .should("have.text", "Email já cadastrado para outro usuário.");
  });
});
