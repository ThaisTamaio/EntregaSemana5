Feature: Crear una página con diferentes tipos de datos inválidos en settings

@user1 @web
Scenario Outline: Como usuario creo una página con diferentes tipos de datos inválidos en settings
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
  And I click New Page
  And I wait for 2 seconds
  And I enter title
  And I wait for 2 seconds
  And I enter paragraphs
  And I wait for 2 seconds
  And I click Settings
  And I wait for 2 seconds
  And I enter date "<date_settings>"
  And I wait for 2 seconds
  And I enter hour "<hour_settings>"
  And I wait for 2 seconds
  And I enter excerpt "<excerpt_settings>"
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  Then I verify the behavior of settings "<id>"

    Examples:
    | id | date_settings  | hour_settings  | excerpt_settings | 
    |  1 |     zzzzzz   |     |     |
    |  2 |     23-02-2023   |   zzzzzz   |  contenido de prueba    |
    |  3 |     23-02-2023   |   15:00   | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec p    |