describe("Visualize", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should click on the visualize button", () => {
    cy.get('.ToolBar').within(() => {
      cy.contains('Visualize').click()
    })
  })
  it("should see the grid change color", () => {
    cy.wait(5000)
    cy.get('#node-7-7').should('have.css', 'background-color', `rgb(66, 192, 251)`)
  })
  it("should reset the grid by clicking reset", () => {
    cy.contains('Reset Grid').click()
    cy.get('#node-7-7').should('have.css', 'background-color', `rgba(0, 0, 0, 0)`)
  })
})
