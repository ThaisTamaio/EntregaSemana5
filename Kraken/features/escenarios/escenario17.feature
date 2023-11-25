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
  And I get the Tag
  And I wait for 2 seconds
  And I select a published page
  And I wait for 2 seconds
  And I click Settings
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I remove all Tags
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 2 seconds
  And I go back to Pages
  And I wait for 2 seconds
  Then I verify I have deleted all Tags