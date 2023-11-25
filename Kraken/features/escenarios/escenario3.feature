Feature: Crear un post y asignar tags

@user1 @web
Scenario: Como usuario creo y publico un post
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
  And I click new post
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
  And I click the Publish button
  And I wait for 2 seconds
  And I publish
  And I wait for 2 seconds
  And I confirm the publish
  And I wait for 5 seconds
  And I go back to editor
  And I wait for 2 seconds
  And I go back to Posts
  And I wait for 2 seconds
  And I click Published
  And I wait for 2 seconds
  Then I verify that my post has been created
  And I verify a tag is assigned to the post

