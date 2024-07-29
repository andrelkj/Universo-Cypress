class LoginPage {
  go() {
    cy.visit("/");
  }

  form(user) {
    cy.get("input[placeholder$=mail]").type(user.email);
    cy.get("input[placeholder$=Senha]").type(user.password);
  }

  submit() {
    cy.contains("button[type=submit]", "Entrar").click();
  }
}

export default new LoginPage();
