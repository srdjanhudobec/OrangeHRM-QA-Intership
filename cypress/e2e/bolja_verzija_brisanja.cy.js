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
        //sad nek ode i kreira novog usera,nakon kreiranja uraditi validaciju
        cy.get('.oxd-main-menu-item.active').click()
        //klikni na dugme i provera dal je kliknuto kako treba
        
        cy.get('.oxd-main-menu-item-wrapper>a').eq(1).click()
        //ide se na add employee
        cy.get('.oxd-topbar-body-nav-tab-item').eq(2).click()

        cy.get('[name="firstName"]').click().type('Petar')
        cy.get('[name="middleName"]').click().type('Drugi')
        const lastName = 'Petrovic'
        cy.get('[name="lastName"]').click().type(lastName)
        
        //mogli smo uzeti i umesto parenta recimo njegovog pradedu i ako se input nalazi u jos jednom divu,dovoljno je samo da idemo find('input') i ako je jedinstven onda ce ga naci u celoj strukturi
        //umesto String(value) mogao sam koristiti value.toString()
        //mozemo koristiti i console.log kao u javascriptu da bi proverili neke vrednosti
        cy.get('input.oxd-input.oxd-input--active').last().invoke('val').then((value) => {
            const id = String(value)
            cy.wrap(id).as('Identifikator')
        });


        // kliknemo save
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click()
        //kliknemo na Employee list
        cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click()
        //upis id
        cy.get('@Identifikator').then((nekaVar) => {
            cy.get('.oxd-input.oxd-input--active').eq(1).type(nekaVar);
        })
        //kliknemo search
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click()
    });


    after('admin_delete_account', () => {
        //brisem ovde usera
        cy.get('.oxd-icon.bi-trash').first().click()
        cy.get('.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin').click()
        //ovde ide verifikacija
        //proveriti da li moze da se proveri da je user obrisan i bez id tog
        cy.wait(5000)
        //intercept sa delete i onda kasnije proverimo da li taj status code ima status code 200 ako ima uspesno ga je obrisao
        //mora wait da bi se stigo obrisati user
        cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding>span').should('contain.text','No Records Found')
    });
});