// let db = mongoose.connection;
describe('Book page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Book navbar link
    // cy.get('.navbar-nav:nth-child(2)')
    cy.get('.ml-auto > :nth-child(3) > .nav-link > .fa').click()
    //  .find('.nav-item:nth-child(1)').click()
  })

  it('allows a customer to sign up', () => {
    // Fill out web form cy.get(':nth-child(1) > .form__input')
    cy.get('.col-md-6').find(':nth-child(1) > .form__input').type(2100999)
    cy.get(':nth-child(2) > .form-label').contains('Name')
    cy.get(':nth-child(2) > .form__input').type('Angle')
    // cy.get('[data-test=name]').type('angle')
    // cy.get('[data-test=email]').type('772012459@qq.com')
    cy.get(':nth-child(3) > .form-label').contains('Email')
    cy.get(':nth-child(3) > .form__input').type('7720159@qq.com')
    // cy.get(':nth-child(4) > .form-label').contains('Password(Minimum Password length is 6)')
    // cy.get('div[data-test="password"] > [data-test=password]').type(123456)
    cy.get(':nth-child(4) > .form__input').type(123456)
    cy.get('.error').should('not.exist')
    cy.get('.btn').click()
    // cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('SignUp Successfully!').should('exist')
    cy.url().should('include', '#/login')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get('.btn').click()
    cy.contains('Something wrong.').should('exist')
  })
})
