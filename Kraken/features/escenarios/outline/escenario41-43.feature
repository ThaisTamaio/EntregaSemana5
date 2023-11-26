Feature: Crear un post con diferentes datos de entrada en titulo y contenido.

@user1 @web
Scenario Outline: Como usuario intento crear un post con diferentes tipos de entrada
  Given I navigate to page "http://www.localhost:2368/ghost"
  And I wait for 2 seconds
  When I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click login
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I enter my first title "<first_title>"
  And I wait for 2 seconds
  And I enter my paragraphs "<post_paragraphs>"
  And I wait for 6 seconds
  Then I verify the behavior while saving a Post v2


  Examples:
    | id | first_title | post_paragraphs  |
    | 1 |              |                  | 
    | 2 | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quissss |  valid_post_paragraphs_1   |
    | 3 |  #$@!        |     valid_post_paragraphs_1             | 
   
     
