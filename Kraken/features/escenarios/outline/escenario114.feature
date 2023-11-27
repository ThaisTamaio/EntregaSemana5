Feature: Abrir el System Event Log de la aplicación

@user1 @web
Scenario Outline: Como usuario abro el system event log
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 5 seconds
  And I click Global Settings
  And I wait for 2 seconds
  And I click View History
  And I wait for 6 seconds
  Then I close History