Feature: Editar una página y cambiar sus tags

@user1 @web
Scenario: Como usuario edito el contenido de una página y sus tags
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login