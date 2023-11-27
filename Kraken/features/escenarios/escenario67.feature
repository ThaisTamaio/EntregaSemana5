Feature: Crear un post y agregarle elementos multimedia

@user1 @web
Scenario: Como usuario creo un post y le agrego elementos multimedia
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I enter paragraphs
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
  And I wait for 2 seconds
  When I select a published post
  And I wait for 2 seconds
  And I modify the paragraphs
  And I wait for 2 seconds
  And I click add card
  And I wait for 2 seconds
  And I click image
  And I wait for 5 seconds
  And I click the Update button
  And I wait for 5 seconds
  And I go back to Posts
  And I wait for 2 seconds
  And I click Published
  And I select a published post
  And I wait for 2 seconds
  Then I verify that my post has multimedia elements