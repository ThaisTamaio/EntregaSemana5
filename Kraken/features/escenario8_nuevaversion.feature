Feature: Crear una serie de posts relacionados con tags comunes

@user1 @web
Scenario: Como usuario creo una serie de posts relacionados con tags comunes
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
  And I click Settings on new version
  And I wait for 2 seconds
  And I click on Tags on new version
  And I wait for 2 seconds
  And I select a Tag on new version
  And I wait for 2 seconds
  And I select another Tag on new version
  And I wait for 2 seconds
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
  And I click Settings on new version
  And I wait for 2 seconds
  And I click on Tags on new version
  And I wait for 2 seconds
  And I select a Tag on new version
  And I wait for 2 seconds
  And I select another Tag on new version
  And I wait for 2 seconds
  And I click the Publish button on new version
  And I wait for 2 seconds
  And I publish on new version
  And I wait for 2 seconds
  And I confirm the publish on new version
  And I wait for 5 seconds