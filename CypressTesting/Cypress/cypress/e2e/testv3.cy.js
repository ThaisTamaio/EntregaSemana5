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

    it('Escenario 50: Exportar Lista de Miembros Sin Ningún Miembro Presente', () => {
        cy.visit('http://localhost:2369/ghost/#/members');
        cy.url().should('include', '/members');
    
        // Abrir el menú de acciones de miembros
        cy.get('button[data-test-button="members-actions"]').click({ force: true });
    
        // Verificar que el botón "Export all members" no exista
        cy.get('span').contains('Export all members').should('not.exist');
    
        // Verificar que el texto "Export selected members" sí exista
        cy.contains('Export selected members').should('exist');
    });
    
    
    
    
    

    
});