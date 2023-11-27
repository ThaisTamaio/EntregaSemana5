Feature: Agregar la información de un miembro y revisar el estado de la suscripción a la newsletter

@user1 @web
Scenario: Como usuario edito la información de un miembro y cambio su estado de suscripción
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 5 seconds
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
  And I subscribe the member to the newsletter
  And I wait for 2 seconds
  And I click Save member
  And I wait for 2 seconds
  And I go back to Members
  And I wait for 2 seconds
  Then I verify that a member has been created
  And I wait for 2 seconds
  When I select the member
  And I wait for 2 seconds
  Then I verify the subscription is turned on