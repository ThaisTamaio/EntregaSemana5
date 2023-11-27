Feature: Buscar opción de exportar datos de analítica

@user1 @web
Scenario Outline: Como usuario busco y uso la opción de exportar datos de analítica
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
  Then I use Export Analytics
  And I wait for 5 seconds