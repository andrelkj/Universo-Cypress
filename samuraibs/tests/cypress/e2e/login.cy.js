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
});
