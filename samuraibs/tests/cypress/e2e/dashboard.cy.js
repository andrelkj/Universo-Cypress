import login from '../support/pages/login';
import loginPage from '../support/pages/login';

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
    };

    before(function () {
      cy.postUser(data.provider);
      cy.postUser(data.customer);

      cy.apiLogin(data.customer).then(() => {
        cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'));
      });

      cy.setProviderId(data.provider.email);

      cy.createAppointment();
    });

    it('o mesmo deve ser exibido no dashboard', function () {
      loginPage.go();
      loginPage.form(data.provider);
      loginPage.submit();
    });
  });
});

import moment from 'moment';

Cypress.Commands.add('createAppointment', function () {
  // define a variable to store the tomorrow date as a number
  let now = new Date();

  now.setDate(now.getDate() + 1);

  // format date using moment library
  const date = moment(now).format('YYYY-MM-DD 14:00:00');

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
