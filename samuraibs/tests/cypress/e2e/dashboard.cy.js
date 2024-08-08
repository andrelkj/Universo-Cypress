import dashboardPage from '../support/pages/dashboard';
import {
  customer,
  provider,
  appointment,
} from '../support/factories/dashboard';

describe('dashboard', function () {
  context('quando o cliente faz um agendamento no app mobile', function () {
    before(function () {
      cy.postUser(provider);
      cy.postUser(customer);

      cy.apiLogin(customer);
      cy.setProviderId(provider.email);
      cy.createAppointment(appointment.hour);
    });

    it('o mesmo deve ser exibido no dashboard', function () {
      const date = Cypress.env('appointmentDate');

      // cy.uiLogin(provider);
      cy.apiLogin(provider, true)

      dashboardPage.calendarShouldBeVisible();
      dashboardPage.selectDay(date);
      dashboardPage.appoitmentShouldBe(customer, appointment.hour);
    });
  });
});
