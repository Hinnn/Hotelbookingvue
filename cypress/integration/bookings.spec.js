describe('Admin login page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get(':nth-child(5) > .nav-link > .fa').click()
  })
  it('allows a admin to login', () => {
  // Fill out web form cy.get(':nth-child(1) > .form__input')
    cy.get('.col-md-6').find(':nth-child(1) > .form__input').type('Yvette@gmail.com')
    cy.get('.form-group--error > .form-label').contains('Password')
    cy.get('.form-group--error > .form__input').type('123456')
    cy.get('.btn').click()
    // cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Login Successfully!').should('exist')
    cy.url().should('include', '#/bookings')
  })
})
describe('Manage Bookings page', () => {
  beforeEach(() => {
    // Delete all bookings in the API's datastore
    cy.request('https://hotelassignment2.herokuapp.com/bookings')
      .its('body')
      .then((bookings) => {
        bookings.forEach((element) => {
          cy.request('DELETE',
            'https://hotelassignment2.herokuapp.com/bookings/' + element.customerID)
        })
      })
    // Populate API's datastore
    cy.fixture('bookings')
      .then((bookings) => {
        bookings.forEach((booking) => {
          cy.request('POST',
            'https://hotelassignment2.herokuapp.com/bookings/', booking)
        })
      })
  })

  it('allows a booking to be edited', () => {
    cy.get('tbody').find('tr').should('have.length', 3)
    cy.get('tbody').find('tr:nth-child(2)').find('td:nth-child(7)').click()
    cy.url().should('include', '/edit')
    cy.get('#paymenttype').select('Visa')
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').clear()
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(2)
    cy.get('#roomNum').select('102')
    cy.get('.error').should('not.exist')
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Thanks for your Booking!').should('exist')
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })
  it('allows a booking to be deleted', () => {
    cy.get('tbody').find('tr').should('have.length', 3)
    // Click trash/delete link of 1st booking in list
    cy.get('tbody').find('tr:nth-child(1)').find('td:nth-child(8)').click()
    // Click confirmation button
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 2)
  })
})
