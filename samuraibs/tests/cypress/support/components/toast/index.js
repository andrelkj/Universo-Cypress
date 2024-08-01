import { el } from "./elements";

class Toast {
  shouldHaveText(expectedText) {
    cy.get(el.toast, {timeout: 10000})
      .should("be.visible")
      .find("p")
      .should("have.text", expectedText);
  }
}

export default new Toast()