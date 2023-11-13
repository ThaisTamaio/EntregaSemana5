Feature: Crear varias páginas estáticas

@user1 @web
Scenario: Como usuario creo varias páginas estáticas
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login