import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dashboard";

describe("login", () => {
  context("quando o usuário é muito bom", () => {
    const user = {
      name: "Test User",
      email: "test@gmail.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.postUser(user);
    });

    it("deve logar com sucesso", () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      dashPage.header.userLoggedIn(user.name);
    });
  });

  context.only("quando o usuário é bom mais a senha está incorreta", () => {
    let user = {
      name: "Test User 2",
      email: "test2@gmail.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.postUser(user).then(() => {
        user.password = "abc123";
      });
    });

    it("deve notificar erro de credenciais", () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
    });
  });
});
