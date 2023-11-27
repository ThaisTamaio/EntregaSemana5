Feature: Agregar varios miembros y exportar su lista

@user1 @web
Scenario: Como usuario agrego varios miembros y exporto un listado
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member
  And I wait for 2 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member
  And I wait for 2 seconds
  And I click Members
  And I wait for 2 seconds
  And I click New member
  And I wait for 2 seconds
  And I enter member name
  And I wait for 2 seconds
  And I enter member email
  And I wait for 2 seconds
  And I enter member note
  And I wait for 2 seconds
  And I click Save member
  And I wait for 2 seconds
  And I click Members
  And I wait for 2 seconds
  And I click the Actions button
  And I wait for 2 seconds
  And I click Export all members
  And I wait for 2 seconds
  And I get the total number of members
  And I wait for 2 seconds
  And I click Import members
  And I wait for 10 seconds
  And I click to confirm the selection of csv file to import
  And I wait for 2 seconds
  And I close the confirmation window
  And I wait for 2 seconds
  And I click the filter
  And I wait for 2 seconds
  And I clear the filter
  And I wait for 2 seconds
  Then I verify the number of members is the same