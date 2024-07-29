class Header {
  userLoggedIn(userName) {
    cy.get("header a strong", { timeout: 7000 })
      .should("be.visible")
      .should("have.text", userName);
  }
}

export default new Header()