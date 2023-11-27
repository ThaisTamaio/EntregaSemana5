Feature: Cambiar el idioma de publicaciones

@user1 @web
Scenario Outline: Como usuario busco cambiar el idioma de publicaciones en Ghost
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 5 seconds
  And I click Global Settings
  And I wait for 2 seconds
  And I click Edit Publication Language
  And I wait for 2 seconds
  And I clear the Publication Language field
  And I wait for 2 seconds
  And I enter new Publication Language "<lang>"
  And I wait for 2 seconds
  Then I save Publication Language
  And I wait for 5 seconds

  Examples:
    | id | lang                     |
    | 1  | es                       |
    | 2  | un lenguaje inexistente  |