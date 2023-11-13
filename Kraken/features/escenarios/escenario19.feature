Feature: Agregar un miembro y revisar su información de participación

@user1 @web
Scenario: Como usuario agrego un miembro y verifico su información
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login