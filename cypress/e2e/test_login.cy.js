describe('login', () => {

    before('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    // xit('admin_login_valid', () => {
    //     //test slucaj
    //     cy.get('input[name=username]').clear().type('Admin')
    //     cy.get('input[name=password]').type('admin123')

    //     cy.get('button').contains('Login').click()
        
    // });

    it('admin_login_invalid', () => {
        //test slucaj
        cy.get('[name=username]').clear().type('Admin')
        cy.get('[name=password]').type('admin123')

        cy.get('button').contains('Login').click()
        //provera da je prosao login
        cy.get('.oxd-brand-banner>img').should('be.visible')
        //sad nek ode i kreira novog usera,nakon kreiranja uraditi validaciju
        cy.get('.oxd-main-menu-item.active').click()
        //klikni na dugme i provera dal je kliknuto kako treba
        cy.get('.oxd-main-menu-item-wrapper>a').contains('Admin').click()
        cy.get('.orangehrm-header-container>button').should('contain.text','Add').click()
        //nakon kliknutog add,proveriti dal imamo ovde dropdown,posto imamo,upisujemo podatke redom
        cy.get('.oxd-select-text-input').should('be.visible')
        //prvo klikne da se pojavi listbox pa onda izabere
        cy.get('.oxd-select-text-input').first().should('be.visible').click()
        cy.get('[role="listbox"]').should('contain.text','Admin').click()
        //upis imena u textbox,kliknuti prvi ponudjeni 
        cy.get('[placeholder="Type for hints..."]').click().type('Odis  Adalwin')
        cy.get('[role="listbox"]').should('contain.text','Odis  Adalwin').first().click()
        //treba da klikne na donji dropdown
        cy.get('.oxd-select-text-input').last().should('be.visible').click()
        cy.get('[role="listbox"]').should('contain.text','Enabled').click()
        //upisivanje podataka i pamcenje za korisnicko ime u konstantu

        //ovde ubaciti if petlju da ako ime postoji onda da se to nekako resi
        const korIme = cy.get('.oxd-input.oxd-input--active').eq(1).click().type('PeraPeric123')

        // cy.get('.oxd-input.oxd-input--active').eq(1).click().type('PeraPeric123')
        //popuni zadnji gde je confirm,a ne popuni deo gde je prvo kucanje passworda

        cy.get('[type="password"]').eq(0).click().type('PeraPeric123')
        cy.wait(2000)
        cy.get('[type="password"]').eq(1).click().type('PeraPeric123')
        //klikne sada dugme save
        cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').click()
        //prvo da se klikne na search bar,potom da se ukuca ono iz variable korIme
        //uzima se ime iz konstante u kojoj je zapamcena vrednost,ukucava se,i nakon toga se izvrsava after deo,gde se taj nadjeni nalog brise i aplikacija moze iznova i iznova da se testira
    });

    after('admin_delete_account', () => {
        //ovde treba da se obrise kreirani account
    });
});