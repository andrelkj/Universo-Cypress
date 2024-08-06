describe("dashboard", function () {
  context("quando o cliente faz um agendamento no app mobile", function () {
    const data = {
      customer: {
        name: "Customer user",
        email: "customer@test.com",
        password: "pwd123",
        is_provider: false,
      },
      provider: {
        name: "Provider User",
        email: "provider@test.com",
        password: "pwd123",
        is_provider: true,
      },
    };

    before(function () {
      cy.postUser(data.customer);
      cy.postUser(data.provider);

      cy.apiLogin(data.customer);
      cy.log("Conseguimos pegar o token " + Cypress.env("apiToken"));
    });

    it("o mesmo deve ser exibido no dashboard", function () {
      console.log(data);
    });
  });
});

Cypress.Commands.add("apiLogin", function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  };

  cy.request({
    method: "POST",
    url: "http://localhost:3333/sessions",
    body: payload,
  }).then(function (response) {
    expect(response.status).to.eq(200);
    console.log(response.body.token);
    Cypress.env("apiToken", response.body.token);
  });
});
