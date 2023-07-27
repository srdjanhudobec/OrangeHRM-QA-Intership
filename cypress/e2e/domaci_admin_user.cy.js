describe('login', () => {

    before('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    it('admin_login_valid', () => {
        //test slucaj
        cy.get('[name=username]').clear().type('Admin')
        cy.get('[name=password]').type('admin123')

        cy.get('button').contains('Login').click()
        //provera da je prosao login
        cy.get('.oxd-brand-banner>img').should('be.visible')
        //klik na admin
        cy.get('.oxd-text.oxd-text--span.oxd-main-menu-item--name').first().click()
        //idemo na add
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary').last().click()
        //klik na strelicu
        cy.get('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click()
        //klik na to da je obican user
        cy.get('.oxd-select-option').last().click()
        //upis hintova
        cy.get('[placeholder = "Type for hints..."]').click().type('Odis')
        cy.wait(2000)
        cy.get('[role="listbox"]').first().click()
        //klik na to da je enabled
        cy.get('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').last().click()
        cy.get('.oxd-select-option').eq(1).click()
        //username
        const userName = "PeraPeric"
        cy.get('.oxd-input.oxd-input--active').eq(1).click().type(userName)
        const password = "peraperic123"
        cy.get('.oxd-input-group.oxd-input-field-bottom-space').eq(4).find('input').click().type(password)
        cy.get('.oxd-input.oxd-input--active').eq(2).click().type(password)
        //kliknemo save
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click()
        cy.wait(2000)
        //logout
        cy.get('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click()
        cy.get('.oxd-userdropdown-link').last().click()
        //logovanje kao novokreirani user
        cy.get('[name=username]').clear().type(userName)
        cy.get('[name=password]').type(password)
        cy.get('button').contains('Login').click()
        //provera da je prosao login
        cy.get('.oxd-brand-banner>img').should('be.visible')
        //provera da je ulogovan taj user koji smo hteli
        cy.get('.oxd-userdropdown-name').should('contain.text','Odis Adalwin')
        //logout
        cy.get('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click()
        cy.get('.oxd-userdropdown-link').last().click()
        //logovanje opt kao admin
        cy.get('[name=username]').clear().type('Admin')
        cy.get('[name=password]').type('admin123')

        cy.get('button').contains('Login').click()
        //provera da je prosao login
        cy.get('.oxd-brand-banner>img').should('be.visible')
        //klik na admin
        cy.get('.oxd-text.oxd-text--span.oxd-main-menu-item--name').first().click()
        //upis da se pretrazuje preko username
        cy.get('.oxd-input.oxd-input--active').last().click().type('PeraPeric{enter}')//sa enter radi
        
        //klik na search
        cy.wait(3000)
        cy.scrollTo('top')
        cy.get('.oxd-form-actions>button').last().click()
        //ostaviti ovaj error oni da pogledaju
    });


    after('admin_delete_account', () => {
        //klik na kanticu
        cy.get('.oxd-icon.bi-trash').click()
        //klik na yes delete
        cy.get('.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin').click()
        cy.wait(5000)
        //verifikacija da je user obrisan
        cy.get('.oxd-text.oxd-text--span').last().should('contain.text','No Records Found')
        //logout
        cy.get('.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon').click()
        cy.get('.oxd-userdropdown-link').last().click()
    });
});