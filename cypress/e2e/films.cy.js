/* eslint-disable no-undef */
describe('Navigation', () => {
  it('should navigate to the films page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Click to nav link films
    cy.get('a[id="nav_link_films"]').click()

    cy.wait(1000)

    // The new url should include "/films"
    cy.url().should('include', '/films')

    // The new page should contain an h1 with "Films"
    cy.get('h1').contains('Films')

    // Click to nav link index
    cy.get('a[id="nav_link_index"]').click()

    cy.wait(1000)

    // Click to nav link index
    cy.get('a[id="films_card"]').click()

    cy.wait(1000)

    // The new url should include "/about"
    cy.url().should('include', '/films')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Films')
  })
})
