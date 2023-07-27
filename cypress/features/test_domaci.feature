Feature: Login Page Fail And Then Success

Scenario: Invalid and Valid Login
    Given I am on the login page
    When I enter invalid username "Admin123"
    And I enter valid password "admin123"
    And I click on the submit button
    And I verify invalid information
    When I enter valid username "Admin"
    And I enter valid password "admin123"
    And I click on the submit button
    Given I am on the dashboard
    And I click on the admin
    And I go back to the dashboard
    Then Verify that user is on the dashboard