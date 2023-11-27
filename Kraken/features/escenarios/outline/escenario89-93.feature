Feature: Crear un tag con diferentes tipos de entrada

@user1 @web
Scenario Outline: Como usuario intento crear un tag con diferentes tipos de entrada
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click Tags
  And I wait for 2 seconds
  And I click new Tag 
  And I wait for 2 seconds
  And I enter my Tag Name "<tag_name>"
  And I wait for 2 seconds
  And I enter my Tag Color "<tag_color>"
  And I wait for 2 seconds
  And I enter my Tag Description "<tag_description>"
  And I wait for 2 seconds
  And I enter a slug "<tag_slug>"
  And I wait for 2 seconds
  And I click Save Tag
  And I wait for 2 seconds
  Then I verify the behavior while saving Tag "<id>"






  Examples:
    | id | tag_name  | tag_color  | tag_description | tag_slug |
    |  1 | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..         |            |           | |
    |  2 |           |            |                 |           |
    |  3 | valid_name |   zzzzzz  |                 |           |
    |  4 |  valid_name_1  |            |                 |  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus..                  |
    |  5 |  valid_name_2  |            | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.                |           |
