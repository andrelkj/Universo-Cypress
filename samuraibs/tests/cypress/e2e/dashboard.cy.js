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
      cy.postUser(data.provider);
      cy.postUser(data.customer);

      cy.apiLogin(data.customer).then((token) => {
        cy.wrap(token).as("apiToken");
        cy.log("Conseguimos pegar o token " + token);
      });

      cy.get('@apiToken').then((token) => {
        cy.setProviderId(token).then((response) => {
          console.log("Provider ID response:", response);
          // Use o response conforme necessário
        });
      });
    });

    it("o mesmo deve ser exibido no dashboard", function () {
      console.log(data);
    });
  });
});

Cypress.Commands.add("setProviderId", function (apiToken) {
  cy.request({
    method: "GET",
    url: "http://localhost:3333/providers",
    headers: {
      authorization: "Bearer " + apiToken,
    },
  }).then(function (response) {
    expect(response.status).to.eq(200);
    console.log(response.body);
  });
});

Cypress.Commands.add("apiLogin", function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  };

  return cy
    .request({
      method: "POST",
      url: "http://localhost:3333/sessions",
      body: payload,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body.token);
      return response.body.token;
    });
});
