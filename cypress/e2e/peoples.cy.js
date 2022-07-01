/* eslint-disable no-undef */
describe('Navigation', () => {
  it('should navigate to the films page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Click to nav link people
    cy.get('a[id="nav_link_peoples"]').click()

    cy.wait(1000)

    // The new url should include "/peoples"
    cy.url().should('include', '/peoples')

    // The new page should contain an h1 with "Peoples"
    cy.get('h1').contains('Peoples')

    // Click to nav link index
    cy.get('a[id="nav_link_index"]').click()

    cy.wait(1000)

    // Click to peoples card
    cy.get('a[id="peoples_card"]').click()

    cy.wait(1000)

    // The new url should include "/peoples"
    cy.url().should('include', '/peoples')

    // The new page should contain an h1 with "Peoples"
    cy.get('h1').contains('Peoples')
  })
})
