Feature: Agregar la información de un miembro y revisar el estado de la suscripción a la newsletter

@user1 @web
Scenario Outline: Como usuario edito la información de un miembro y cambio su estado de suscripción
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
  And I enter member name "<member_name>"
  And I wait for 2 seconds
  And I enter member email "<member_email>"
  And I wait for 2 seconds
  And I enter member note "<member_note>"
  And I wait for 2 seconds
  And I click Save member
  And I wait for 2 seconds
  Then I verify the behavior while saving member

  Examples:
    | member_name   | member_email      | member_note                         |
    | Test          | test@gmail.com    | Escenario original: todo bien       |
    | Duplicate     | test@gmail.com    | Escenario 1: email duplicado        |
    |               |                   | Escenario 2: email en blanco        |
    | Inválido      | email_invalido    | Escenario 3: email inválido         |
    | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | test34@gmail.com | Escenario 4: nombre excede límite de caracteres  |
    | Escenario 5: nota excede límite de caracteres  | test2@gmail.com   | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu |
