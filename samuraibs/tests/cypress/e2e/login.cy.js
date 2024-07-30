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

  context("quando o usuário é bom mais a senha está incorreta", () => {
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

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.toast.shouldHaveText(message);
    });
  });

  context("quando o formato do email é inválido", () => {
    const emails = [
      "test.com.br",
      "gmail.com",
      "@gmail.com",
      "@",
      "test@",
      "111",
      "&*^&^&",
      "test123",
    ];

    emails.forEach((email) => {
      it("não deve logar com o email: " + email, () => {
        const user = { email: email, password: "pwd123" };
        loginPage.go();
        loginPage.form(user);
        loginPage.submit();
        loginPage.alertHaveText("Informe um email válido");
      });
    });
  });
});
