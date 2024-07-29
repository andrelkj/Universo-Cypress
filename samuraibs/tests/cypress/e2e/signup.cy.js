import signupPage from "../support/pages/signup";

describe("cadastro", () => {
  context("quando o usuário é novato", () => {
    const user = {
      name: "Test User",
      email: "test@gmail.com",
      password: "pwd123",
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("deve cadastrar com sucesso", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toasterHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o email já existe", () => {
    const user = {
      name: "Test User 2",
      email: "test2@gmail.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("não deve cadastrar o usuário", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toasterHaveText("Email já cadastrado para outro usuário.");
    });
  });
});
