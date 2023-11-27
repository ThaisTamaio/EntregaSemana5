Feature: Modificar un post para cambiar su enfoque y actualizar tags o multimedia

@user1 @web
Scenario: Como usuario edito los tags y el contenido de un post
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 4 seconds
  And I click Published
  And I wait for 2 seconds
  And I select a published post
  And I wait for 2 seconds
  And I enter paragraphs
  And I wait for 2 seconds
  And I click the image
  And I wait for 2 seconds
  And I click Replace multimedia element 
  And I wait for 5 seconds
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
  And I click Published
  And I wait for 2 seconds
  And I get the Tag
  And I wait for 2 seconds
  And I select a published post
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
  And I go back to Posts
  And I wait for 2 seconds
  And I get the new Tag
  And I wait for 2 seconds  
  Then I verify I have changed the tags
