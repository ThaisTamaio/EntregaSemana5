Feature: Modificar una página estática

@user1 @web
Scenario: Como usuario edito una página estática
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Pages
  And I wait for 2 seconds
  And I select a published page
  And I wait for 2 seconds
  And I click title
  And I wait for 2 seconds
  And I modify the title
  And I wait for 2 seconds
  And I enter paragraphs
  And I wait for 2 seconds
  And I click the Update button
  And I wait for 5 seconds
  And I go back to Pages
  And I wait for 2 seconds
  Then I verify that my page has been modified
