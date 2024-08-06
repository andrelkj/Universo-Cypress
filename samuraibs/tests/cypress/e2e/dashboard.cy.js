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
  
        cy.apiLogin(data.customer).then((token) => {
          cy.wrap(token).as('apiToken');
          cy.log("Conseguimos pegar o token " + token);
        });
      });
  
      it("o mesmo deve ser exibido no dashboard", function () {
        cy.get('@apiToken').then((token) => {
          console.log("Token:", token);
          // Use o token conforme necessário
        });
        console.log(data);
      });
    });
  });
  
  Cypress.Commands.add("apiLogin", function (user) {
    const payload = {
      email: user.email,
      password: user.password,
    };
  
    return cy.request({
      method: "POST",
      url: "http://localhost:3333/sessions",
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body.token);
      return response.body.token;
    });
  });
  