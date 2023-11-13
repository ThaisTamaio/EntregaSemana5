Feature: Crear un post, publicarlo y editarlo multiples veces

@user1 @web
Scenario: Como usuario creo un post y lo edito múltiples veces
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
  And I wair for 2 seconds
  And I click the Publish button
  And I wait for 2 seconds
  And I publish
  And I wait for 2 seconds
  And I confirm the publish
  And I wait for 5 seconds
  And I click Published
  And I wait for 2 seconds
  And I select a published post
  And I wait for 2 seconds
  And I click title
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 2 seconds
  And I go back to Posts
  And I wait for 2 seconds
  And I click Published
  And I wait for 2 seconds
  And I select a published post
  And I wait for 2 seconds
  And I click title
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 2 seconds
  And I go back to Posts
  And I wait for 2 seconds