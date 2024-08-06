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
    });

    it("o mesmo deve ser exibido no dashboard", function () {
      console.log(data);
    });
  });
});
