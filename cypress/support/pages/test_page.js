class LoginPage {
    // Element locators
    USERNAME = "input[name=username]";
    PASSWORD = "input[name=password]";
    SUBMIT = "button[type=submit]";
    TITLE = ".oxd-topbar-header-breadcrumb-module";
    INVALID = ".oxd-alert.oxd-alert--error";
    DASHBOARD = ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module";
    ADMIN = ".oxd-text.oxd-text--span.oxd-main-menu-item--name"
    DASHBOARD_BUTTON = ".oxd-text.oxd-text--span.oxd-main-menu-item--name"
    // Element locator functions
  
    // Methods
    openApp() {
      return cy.visit("/");
    }
  
    enterUsername(username) {
      return cy.get(this.USERNAME).type(username);
    }
  
    enterPassword(pass) {
      return cy.get(this.PASSWORD).type(pass);
    }
  
    enterSubmitButton() {
      return cy.get(this.SUBMIT).click();
    }
    
    verifyInvalid() {
        return cy.get(this.INVALID).should('be.visible')
    }

    verifyDashboard(){
      return cy.get(this.DASHBOARD).should('be.visible')
    }

    verifyTitle() {
      return cy.get(this.TITLE);
    }

    clickAdmin(){
      return cy.get(this.ADMIN).first().click()
    }
    
    clickDashboard(){
      return cy.get(this.DASHBOARD_BUTTON).eq(7).click()
    }
  }
  
  export default LoginPage;