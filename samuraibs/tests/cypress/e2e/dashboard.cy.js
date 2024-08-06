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

import moment from 'moment';

Cypress.Commands.add('createAppointment', function (hour) {
  // define a variable to store the tomorrow date as a number
  let now = new Date();

  now.setDate(now.getDate() + 1);
  Cypress.env('appointmentDay', now.getDate());

  // format date using moment library
  const date = moment(now).format('YYYY-MM-DD ' + hour + ':00');

  // define request payload
  const payload = {
    provider_id: Cypress.env('providerId'),
    date: date,
  };

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/appointments',
    body: payload,
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log(response.body.token);
  });
});

Cypress.Commands.add('setProviderId', function (providerEmail) {
  // get auth token and create env variable
  cy.request({
    method: 'GET',
    url: 'http://localhost:3333/providers',
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken'),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200);
    // get providers list
    console.log(response.body);

    //store providers list in a variable
    const providerList = response.body;

    // iterate through the providers list to get the provider id that matches the given email
    providerList.forEach(function (provider) {
      if (provider.email === providerEmail) {
        //store provider id into a env variable
        Cypress.env('providerId', provider.id);
      }
    });
  });
});

Cypress.Commands.add('apiLogin', function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  };

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: payload,
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log(response.body.token);
    Cypress.env('apiToken', response.body.token);
  });
});
