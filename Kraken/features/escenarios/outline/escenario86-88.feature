Feature: Ingresar a la aplicación con diferentes tipos de entrada

@user1 @web
Scenario Outline: Como usuario intento ingresar a la aplicación con diferentes tipos de entrada
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter my email "<user_email>"
  And I wait for 2 seconds
  And I enter my password "<user_password>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  Then I verify the behavior while try to login "<id>"


  Examples:
    | id | user_email   | user_password  |
    |  1 |              |                |
    |  2 | jf.gonzalezg12@uniandes.edu.co| x|
    |  3 | jf.gonzal@gmail.com     |  password  |