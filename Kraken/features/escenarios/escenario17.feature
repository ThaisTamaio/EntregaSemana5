Feature: Eliminar tag y verificar en página

@user1 @web
Scenario: Como usuario elimino un tag de una página
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Pages
  And I wait for 2 seconds
  And I click New Page
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I enter paragraphs
  And I wait for 2 seconds
  And I click add card
  And I wait for 2 seconds
  And I click image
  And I wait for 5 seconds
  And I click the Publish button
  And I wait for 2 seconds
  And I publish
  And I wait for 2 seconds
  And I confirm the publish
  And I wait for 5 seconds
