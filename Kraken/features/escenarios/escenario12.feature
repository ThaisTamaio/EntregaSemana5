Feature: Crear una página estática

@user1 @web
Scenario: Como usuario creo una página estática
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Tags
  And I wait for 2 seconds
  And I click new Tag
  And I wait for 2 seconds
  And I enter Tag Name
  And I wait for 2 seconds
  And I enter Tag Color
  And I wait for 2 seconds
  And I enter Tag Description
  And I wait for 2 seconds
  And I click Save Tag
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
  And I click Settings
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I select a Tag
  And I wait for 2 seconds
  And I select another Tag
  And I click the Publish button
  And I wait for 2 seconds
  And I publish
  And I wait for 2 seconds
  And I confirm the publish
  And I wait for 5 seconds
