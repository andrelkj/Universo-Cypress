// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from 'moment';
import loginPage from './pages/login';
import dashboardPage from './pages/dashboard';

const apiServer = Cypress.env('apiServer');

// App Actions
Cypress.Commands.add('uiLogin', function (user) {
  loginPage.go();
  loginPage.form(user);
  loginPage.submit();
  dashboardPage.header.userLoggedIn(user.name);
});

Cypress.Commands.add('postUser', (user) => {
  cy.task('removeUser', user.email).then(function (result) {
    console.log(result);
  });

  cy.request({ method: 'POST', url: `${apiServer}/users`, body: user }).then(
    function (response) {
      expect(response.status).to.eq(200);
    }
  );
});

Cypress.Commands.add('recoveryPass', (email) => {
  cy.request({
    method: 'POST',
    url: `${apiServer}/password/forgot`,
    body: {
      email: email,
    },
  }).then(function (response) {
    expect(response.status).to.eq(204);

    cy.task('findToken', email).then(function (result) {
      Cypress.env('recoveryToken', result.token);
    });
  });
});

Cypress.Commands.add('createAppointment', function (hour) {
  // define a variable to store the tomorrow date as a number
  let now = new Date();

  now.setDate(now.getDate() + 1);
  Cypress.env('appointmentDay', now.getDate());

  // format date using moment library
  const date = moment(now).format(`YYYY-MM-DD ${hour}:00`);

  // define request payload
  const payload = {
    provider_id: Cypress.env('providerId'),
    date: date,
  };

  cy.request({
    method: 'POST',
    url: `${apiServer}/appointments`,
    body: payload,
    headers: {
      authorization: `Bearer ${Cypress.env('apiToken')}`,
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
    url: `${apiServer}/providers`,
    headers: {
      authorization: `Bearer ${Cypress.env('apiToken')}`,
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
    url: `${apiServer}/sessions`,
    body: payload,
  }).then((response) => {
    expect(response.status).to.eq(200);
    console.log(response.body.token);
    Cypress.env('apiToken', response.body.token);
  });
});
