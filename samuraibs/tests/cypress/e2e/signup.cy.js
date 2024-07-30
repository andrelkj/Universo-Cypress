import signupPage from "../support/pages/signup";

describe("cadastro", () => {
  let success;
  let email_dup;
  let email_inv;
  let short_password;

  before(() => {
    cy.fixture("signup").then((signup) => {
      success = signup.success;
      email_dup = signup.email_dup;
      email_inv = signup.email_inv;
      short_password = signup.short_password;
    });
  });

  context("quando o usuário é novato", () => {
    before(() => {
      cy.task("removeUser", success.email).then(function (result) {
        console.log(result);
      });
    });

    it("deve cadastrar com sucesso", () => {
      signupPage.go();
      signupPage.form(success);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando o email já existe", () => {
    before(() => {
      cy.postUser(email_dup);
    });

    it("não deve cadastrar o usuário", () => {
      signupPage.go();
      signupPage.form(email_dup);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Email já cadastrado para outro usuário."
      );
    });
  });

  context("quando o email é incorreto", () => {
    it("deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.form(email_inv);
      signupPage.submit();
      signupPage.alert.haveText("Informe um email válido");
    });
  });

  context("quando a senha é muito curta", () => {
    const passwords = ["1", "2a", "ab3", "abc4", "ab#c5"];

    beforeEach(() => {
      
    });

    passwords.forEach((p) => {
      it("não deve cadastrar com a senha: " + p, () => {
        short_password.password = p

        signupPage.go();
        signupPage.form(short_password);
        signupPage.submit();
      });

      afterEach(() => {
        signupPage.alert.haveText("Pelo menos 6 caracteres");
      });
    });
  });

  context("quando não preencho nenhum dos campos", () => {
    const alertMessages = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória",
    ];

    before(() => {
      signupPage.go();
      signupPage.submit();
    });

    it("deve exibir mensagens de erro", () => {
      alertMessages.forEach((alert) => {
        signupPage.alert.haveText(alert);
      });
    });
  });
});
