Feature: Modificar un post para cambiar su enfoque y actualizar tags y multimedia

@user1 @web
Scenario: Como usuario edito los tags y el contenido de un post
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Published
  And I wait for 2 seconds
  And I select a published post
  And I wait for 2 seconds
  And I click add card
  And I wait for 2 seconds
  And I click image
  And I wait for 2 seconds
  And I click Settings
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I select a Tag
  And I wait for 2 seconds
  And I click the Publish button
  And I wait for 2 seconds
  And I publish
  And I wait for 2 seconds
  And I confirm the publish
  
