Feature: Editar la información de un miembro y cambiar el estado de la suscripción a la newsletter

@user1 @web
Scenario: Como usuario edito la información de un miembro y cambio su estado de suscripción
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login