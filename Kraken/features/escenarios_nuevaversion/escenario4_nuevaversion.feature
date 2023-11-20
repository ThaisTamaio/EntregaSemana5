Feature: Editar un Post y cambiar sus tags

@user1 @web
Scenario: Como usuario edito un post y cambio sus tags
  Given I navigate to page "http://www.localhost:3001/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>" on new version
  And I wait for 2 seconds
  And I enter password "<PASSWORD>" on new version
  And I wait for 2 seconds
  And I click login on new version
  And I wait for 4 seconds
  And I click Published on new version
  And I wait for 2 seconds
  And I select a published post on new version
  And I wait for 2 seconds
  And I enter paragraphs on new version
  And I wait for 2 seconds
  And I click Settings on new version
  And I wait for 2 seconds
  And I click on Tags on new version
  And I wait for 2 seconds
  And I select a Tag on new version
  And I wait for 2 seconds
  And I close Settings on new version
  And I wait for 2 seconds
  And I click the Update button on new version
  And I wait for 2 seconds
  And I confirm the Update on new version
  And I wait for 2 seconds
  And I go back to Posts on new version
  And I wait for 2 seconds
  And I click Published on new version
  And I wait for 2 seconds
  And I get the Tag on new version
  And I wait for 2 seconds
  And I select a published post on new version
  And I wait for 2 seconds
  And I click Settings on new version
  And I wait for 2 seconds
  And I remove a Tag on new version
  And I wait for 2 seconds
  And I click on Tags on new version
  And I wait for 2 seconds
  And I close Settings on new version
  And I wait for 2 seconds
  And I click the Update button on new version
  And I wait for 2 seconds
  And I confirm the Update on new version
  And I wait for 2 seconds
  And I go back to Posts on new version
  And I wait for 2 seconds
  And I get the new Tag on new version
  And I wait for 2 seconds  
  Then I verify I have changed the tags on new version
 