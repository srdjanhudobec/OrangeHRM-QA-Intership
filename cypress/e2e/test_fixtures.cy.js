describe('login', () => {

    before('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    it('admin_login_valid', () => {
        //test slucaj
        cy.fixture('test_items').then(data => {
            const testdata = data
                const admin_username = testdata.credentials.admin_username
                const admin_password = testdata.credentials.admin_password
                cy.get('input[name=username]').clear().type(admin_username)
                cy.get('input[name=password]').type(admin_password)
                cy.get('button[type=submit]').click()
        })
        
    });

});