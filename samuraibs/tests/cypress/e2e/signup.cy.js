describe("cadastro", () => {
  it("deve cadastrar um novo usuário", () => {
    const user = {
      name: "Test User",
      email: "test@gmail.com",
      password: "pwd123",
    };

    cy.task("removeUser", user.email).then(function (result) {
      console.log(result);
    });

    cy.visit("/signup");

    cy.get('input[placeholder="Nome"]').type(user.name);
    cy.get('input[placeholder="E-mail"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);

    cy.contains("button", "Cadastrar").click();

    cy.get(".toast")
      .should("be.visible")
      .find("p")
      .should(
        "have.text",
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
  });

  it("deve exibir email já cadastrado", () => {
    const user = {
      name: "Test User 2",
      email: "test2@gmail.com",
      password: "pwd123",
      is_provider: true,
    };

    cy.task("removeUser", user.email).then(function (result) {
      console.log(result);
    });

    cy.request("POST", "http://localhost:3333/users", user).then(function (
      response
    ) {
      expect(response.status).to.eq(200);
    });

    cy.visit("/signup");

    cy.get('input[placeholder="Nome"]').type(user.name);
    cy.get('input[placeholder="E-mail"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);

    cy.contains("button", "Cadastrar").click();

    cy.get(".toast")
      .should("be.visible")
      .find("p")
      .should("have.text", "Email já cadastrado para outro usuário.");
  });
});
