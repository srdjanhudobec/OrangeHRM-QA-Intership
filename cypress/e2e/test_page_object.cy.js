const { onLoginPage } = require('../support/page_objects/login_page')

describe('add_employee', () => {
    let testdata

    before('open application', () => {
        cy.openApp()
        cy.fixture('test_items').then((data) => {
            testdata = data
        })
    })

    it('add/delete employee',() => {
        onLoginPage.login_admin()
    })
})