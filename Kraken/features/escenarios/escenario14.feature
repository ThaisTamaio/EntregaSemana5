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
  And I wait for 4 seconds
  And I click Pages
  And I wait for 2 seconds
  And I select a published page
  And I wait for 2 seconds
  And I enter paragraphs
  And I wait for 2 seconds
  And I click Settings
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I select a Tag
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 2 seconds
  And I go back to Posts
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
  And I remove a Tag
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I select another Tag
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 2 seconds
  And I go back to Pages
  And I wait for 2 seconds
  And I get the new Tag
  And I wait for 2 seconds  
  Then I verify I have changed the tags