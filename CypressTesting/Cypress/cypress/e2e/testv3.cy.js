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

    it('Escenario 31: Crear un Post con Excerpt Normal', () => {
        const tags = [faker.lorem.word()];
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const postExcerpt = faker.lorem.sentence(); // Generar un excerpt aleatorio
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
    
        // Agregar excerpt
        cy.get('textarea.post-setting-custom-excerpt').type(postExcerpt);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);
        cy.contains(postTitle).click({force: true});
        cy.get('button.settings-menu-toggle').click();
    
        // Verificar el excerpt
        cy.get('textarea.post-setting-custom-excerpt').invoke('val').should('eq', postExcerpt);
    });    
    
    


     

    
});