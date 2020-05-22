Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then((res) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test_user',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test_user')
      cy.get('#password').type('password')
      cy.get('#btn-login').click()

      cy.contains('Test User')
    })

    it('fails with invalid credentials', function () {
      cy.get('#username').type('not_a_user')
      cy.get('#password').type('not_a_password')
      cy.get('#btn-login').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Test User logged it')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_user', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.get('#blogForm-toggle').click()
      cy.get('#title').type('Test Title', { force: true })
      cy.get('#author').type('Test Author', { force: true })
      cy.get('#url').type('www.test.com', { force: true })
      cy.get('#btn-submit-blogform').click()

      cy.contains('Test Title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'I am a Blog',
          author: 'Anne Author',
          url: 'http://www.blogs.com',
        })
      })

      it('it can be liked', function () {
        cy.get('#btn-bloginfo').click()
        cy.get('.btn-like').click()

        cy.get('#likes').should('to.be', 1)
      })
    })
  })
})
