import loginPage from '../support/pages/login';
import dashboardPage from '../support/pages/dashboard';

describe('dashboard', function () {
  context('quando o cliente faz um agendamento no app mobile', function () {
    const data = {
      customer: {
        name: 'Customer user',
        email: 'customer@test.com',
        password: 'pwd123',
        is_provider: false,
      },
      provider: {
        name: 'Provider User',
        email: 'provider@test.com',
        password: 'pwd123',
        is_provider: true,
      },
      appointmentHour: '14:00',
    };

    before(function () {
      cy.postUser(data.provider);
      cy.postUser(data.customer);

      cy.apiLogin(data.customer);
      cy.setProviderId(data.provider.email);
      cy.createAppointment(data.appointmentHour);
    });

    it('o mesmo deve ser exibido no dashboard', function () {
      loginPage.go();
      loginPage.form(data.provider);
      loginPage.submit();

      dashboardPage.calendarShouldBeVisible();

      const day = Cypress.env('appointmentDay');
      dashboardPage.selectDay(day);

      dashboardPage.appoitmentShouldBe(data.customer, data.appointmentHour);
    });
  });
});
