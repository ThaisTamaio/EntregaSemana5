Feature: Creación y publicación de un post

@user1 @web
Scenario: Como usuario creo y publico un post
  Given I navigate to page "http://www.localhost:3001/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>" on new version
  And I wait for 2 seconds
  And I enter password "<PASSWORD>" on new version
  And I wait for 2 seconds
  And I click login on new version
  And I wait for 2 seconds
  And I click new post on new version
  And I wait for 2 seconds
  And I enter title on new version
  And I wait for 2 seconds
  And I enter paragraphs on new version
  And I wait for 2 seconds
  And I click add card on new version
  And I wait for 2 seconds
  And I click image on new version
  And I wait for 5 seconds
  And I click the Publish button on new version
  And I wait for 2 seconds
  And I publish on new version
  And I wait for 2 seconds
  And I confirm the publish on new version
  And I wait for 5 seconds
  And I go back to editor on new version
  And I wait for 2 seconds
  And I go back to Posts on new version
  And I wait for 2 seconds
  And I click Published on new version
  And I wait for 2 seconds
  Then I verify that my post has been created on new version