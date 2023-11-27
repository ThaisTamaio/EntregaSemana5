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

    it('Escenario 55: Crear una Página con Code Injection Inválido', () => {
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();
        const codeInjection = faker.lorem.paragraph();
    
        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.get('div.CodeMirror-scroll').first().type(codeInjection);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click({force: true});
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.wait(1000);
        cy.contains(pageTitle).click({force: true});
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.contains(codeInjection);
    });
    
    
    
    
    
    
    

    
});