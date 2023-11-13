Feature: Eliminar tag y verificar en post

@user1 @web
Scenario: Como usuario elimino un tag 
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wair for 5 seconds
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
  
  