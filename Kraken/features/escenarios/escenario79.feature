Feature: Editar un miembro y cambiar el estado de suscripción

@user1 @web
Scenario: Como usuario edito un miembro y actualizo su información
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
  And I select the member
  And I wait for 2 seconds
  And I modify the member name
  And I wait for 2 seconds
  And I modify the member email
  And I wait for 2 seconds
  And I unsubscribe the member from the newsletter
  And I wait for 2 seconds
  Then I save my member info updates
  And I wait for 2 seconds
  When I go back to Members
  And I wait for 2 seconds
  And I select the member
  And I wait for 2 seconds
  Then I verify the subscription is turned off