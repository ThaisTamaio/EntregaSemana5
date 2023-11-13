Feature: Agregar varios miembros y exportar su lista

@user1 @web
Scenario: Como usuario agrego varios miembros y exporto un listado
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 5 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member
  And I wait for 5 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member
  And I wait for 5 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member