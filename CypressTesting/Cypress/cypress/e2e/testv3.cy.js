// Importar faker
import {faker} from '@faker-js/faker';

describe('Ghost tests version 3.42', () => {
    beforeEach(() => {
        cy.visit('http://localhost:2369/ghost/');
        cy.get('input[name="identification"]').type('pruebas@gmail.com');
        cy.get('input[name="password"]').type('pruebas1234');
        cy.get('span').contains('Sign in').click();

        // Manejar excepciones no capturadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Se detectó una excepción no capturada:', err);
            return false;
        });
    }); 

    it('Escenario 40: Crear un Post y Utilizar Caracteres no Convencionales en el Contenido', () => {
    const postTitle = faker.lorem.sentence();
    // Generar un párrafo con caracteres especiales
    const specialCharacters = "!@#$%^&*()_+[]{};':,.<>/?`~";
    const postContent = faker.lorem.sentence() + specialCharacters + faker.lorem.sentence();

    cy.get('a[href="#/posts/"]').click();
    cy.url().should('include', '/posts');
    cy.get('span').contains('New post').click();
    cy.url().should('include', '/editor/post');
    cy.get('textarea[placeholder="Post title"]').type(postTitle);
    cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(postContent);
    cy.get('span').contains('Publish').click();
    cy.get('span').contains('Continue, final review').click();
    cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    cy.visit(`http://localhost:2369/ghost/#/posts`);
    cy.contains(postTitle).should('exist');
});


    
});