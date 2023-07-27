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
        cy.get('[name="lastName"]').click().type('Petrovic')
        
        function dobaviId() {
            return new Promise((resolve) => {
                cy.get('input.oxd-input.oxd-input--active').last().then(($input) => {
                    const id = $input.val();
                    resolve(id);
                });
            });
        }
        // Kada pozovete funkciju, koristite .then() za pristup vrednosti ID-ja
        dobaviId().then((vrednost) => {
            // kliknemo save
            cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click()
            //kliknemo na Employee list
            cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click()
            //upis id
            cy.log(vrednost);
            cy.get('.oxd-input.oxd-input--active').eq(1).type(vrednost);
        });
        
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
        //mora wait da bi se stigo obrisati user
        cy.get('.orangehrm-horizontal-padding.orangehrm-vertical-padding>span').should('contain.text','No Records Found')
    });
});