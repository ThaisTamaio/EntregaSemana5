Feature: Modificar un post existente

@user1 @web
Scenario: Como usuario modifico un post existente
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
  And I click title
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I enter paragraph
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 5 seconds
