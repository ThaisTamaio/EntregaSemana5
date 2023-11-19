Feature: Agregar un miembro y revisar su información de participación

@user1 @web
Scenario: Como usuario agrego un miembro y verifico su información
  Given I navigate to page "http://www.localhost:3001/ghost"
  And I wait for 2 seconds 
  When I enter email "<USERNAME>" on new version
  And I wait for 2 seconds 
  And I enter password "<PASSWORD>" on new version
  And I wait for 2 seconds
  And I click login on new version
  And I wait for 5 seconds
  And I click Members on new version
  And I wait for 2 seconds
  And I click New member on new version
  And I wait for 2 seconds
  And I enter member name on new version
  And I wait for 2 seconds
  And I enter member email on new version
  And I wait for 2 seconds
  And I enter member note on new version
  And I wait for 2 seconds
  And I click Save member on new version
  And I wait for 2 seconds
  And I go back to Members on new version
  And I wait for 2 seconds
  Then I verify that a member has been created on new version