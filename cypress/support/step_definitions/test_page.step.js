// Imports
const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");

import loginPage from "./../pages/test_page.js";

// Variables
const login = new loginPage();

//pitati zasto vadi i iz login pagea idalje
//Given methods (Actions) - In which state app should be
Given(/^I am on the login page$/, function () {
  login.openApp();
});

Given(/^I enter valid username "(.*)"$/, function (username) {
  login.enterUsername(username);
});

Given(/^I enter valid password "(.*)"$/, function (password) {
  login.enterPassword(password);
});

Given(/^I click on the submit button$/, function () {
  login.enterSubmitButton();
});

//THEN methods (Assertions)
Then(/^Verify that user is login in application$/, function () {
  login.verifyTitle().should("contain", "Dashboard");
});

Given(/^I enter invalid username "(.*)"$/, function (username) {
  login.enterUsername(username);
});

Given(/^I verify invalid information$/, function () {
    login.verifyInvalid();
});

Given(/^I am on the dashboard$/, function () {
  login.verifyDashboard();
});

Given(/^I click on the admin$/, function () {
  login.clickAdmin();
});

Given(/^I go back to the dashboard$/, function () {
  login.clickDashboard();
});


Then("Verify that user is on the dashboard", function () {

    return "pending";

});
