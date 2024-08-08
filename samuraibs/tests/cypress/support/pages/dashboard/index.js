import { el } from './elements';

import header from '../../components/header';

class DashPage {
  constructor() {
    this.header = header;
  }

  calendarShouldBeVisible() {
    cy.get(el.calendar, { timeout: 7000 }).should('be.visible');
  }

  selectDay(day) {
    let today = new Date();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // get the last day of the month

    cy.log(today.toString());
    cy.log(lastDayOfMonth.toString());

    if(today.getDate() === lastDayOfMonth.getDate()) {
      cy.log('Estamos no último dia do mês')
      cy.get(el.nextMonthButton).should('be.visible').click()
      
      // check point to ensure new month loads
      cy.contains(el.monthYearName, 'Setembro').should('be.visible')
    } else {
      cy.log('Hoje não é o último dia do mês')
    }

    const target = new RegExp('^' + day + '$', 'g');
    cy.contains(el.boxDay, target).click();
  }

  appoitmentShouldBe(customer, hour) {
    cy.contains('div', customer.name)
      .should('be.visible')
      .parent()
      .contains(el.boxHour, hour)
      .should('be.visible');
  }
}

export default new DashPage();
