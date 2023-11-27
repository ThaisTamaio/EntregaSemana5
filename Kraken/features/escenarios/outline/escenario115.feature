Feature: Buscar opción de exportar todo el contenido de Ghost

@user1 @web
Scenario Outline: Como usuario busco y uso la opción de exportar todo el contenido de Ghost
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
  And I click Open Labs
  And I wait for 2 seconds
  Then I use Export Content
  And I wait for 5 seconds