// Importar faker
import {faker} from '@faker-js/faker';

describe('Ghost Post Creation and Publication', () => {
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
        cy.get('button[data-test-button="members-actions"]').click({ force: true });
        cy.get('span').contains('Export all members').should('not.exist');
        cy.contains('Export selected members').should('exist');
    });

    it('Escenario 1: Creación y publicación de un post', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });    

    it('Escenario 2: Modificar un post existente', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();
        const newPostContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.wait(1000)
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.url().should('include', '/posts');
        cy.wait(1000)
        cy.contains(postTitle).click({force: true});
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPostContent);
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/post');
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.contains(postTitle).click();
        cy.contains(newPostContent).should('exist');
    });    

    it('Escenario 3: Crear un Post y asignar tags', () => {
        const tags = [faker.lorem.word(), faker.lorem.word()];
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.sentence();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();

        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });

        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.contains(postTitle).should('exist');

        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.contains(tags[0]).should('exist');
    });

    it('Escenario 4: Editar un Post y Cambiar sus tags', () => {
        const tagtest1 = faker.lorem.word();
        const tagtest2 = faker.lorem.word();
        const tags = [tagtest1, tagtest2];
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2369/ghost/#/posts');
    
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
        });
    
        cy.wait(1000);
        cy.get('a[data-test-nav="posts"]').click();
        cy.wait(1000);
        cy.url().should('include', '/posts');
        cy.contains(postTitle).click({ force: true });
        cy.get('button.settings-menu-toggle').click();
    
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });
    
        cy.get('span.settings-menu-open').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.contains(postTitle).click({ force: true });
        cy.get('button.settings-menu-toggle').click();
        cy.contains(tagtest1);
        cy.contains(tagtest2);
    });
    
    it('Escenario 5: Eliminar tag y Verificar en Post', () => {
        const tagName = faker.lorem.word();
        cy.get('a[href="#/tags/"]').click();
        cy.url().should('include', '/tags');
        cy.get('span').contains('New tag').click();
        cy.get('#tag-name').type(tagName);
        cy.get('span').contains('Save').click();
        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.wait(1000);
        cy.contains(tagName).click({ force: true });
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
    });
    
    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples veces', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2369/ghost/#/posts');
    
        for (let i = 1; i <= 3; i++) {
            const newPostContent = faker.lorem.paragraph();
            cy.visit('http://localhost:2369/ghost/');
            cy.get('a[href="#/posts/"]').click({ multiple: true, force: true });
            cy.url().should('include', '/posts');
            cy.contains(postTitle).click({ force: true });
            cy.url().should('include', '/editor/post');
            cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPostContent);
            cy.get('span').contains('Update').click();
            cy.url().should('include', '/editor/post');
            cy.contains(newPostContent).should('exist');
        }
    });     

    it('Escenario 7: Crear un Post y luego Agregarle Elementos Multimedia', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);

        cy.contains(postTitle).click({ force: true });
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });
        cy.wait(1000);
        cy.get('a.gh-unsplash-button').contains('Insert image').click({ force: true });
        cy.wait(1000);
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/post');
    });   

    it('Escenario 8: Crear una Serie de Posts Relacionados con Tags Comunes', () => {
        const post1 = faker.lorem.words();
        const post2 = faker.lorem.words();
        const post3 = faker.lorem.words();
        const tag = faker.lorem.words();
        const posts = [post1, post2, post3];
        const tags = [tag];

        posts.forEach(post => {
            const postContent= faker.lorem.paragraph();
            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.url().should('include', '/posts');
            cy.get('span').contains('New post').click();
            cy.url().should('include', '/editor/post');
            cy.get('textarea[placeholder="Post title"]').type(post);
            cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
            cy.get('button.settings-menu-toggle').click();

            tags.forEach(tag => {
                cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
                cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
            });

            cy.get('span.settings-menu-open').click();
            cy.get('span').contains('Publish').click();
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.contains(postContent).should('exist');

            cy.visit('http://localhost:2369/ghost/#/tags');
            cy.contains(tag).should('exist');
        });
    });   
    
    it('Escenario 9: Modificar un Post para Cambiar su Enfoque y Actualizar Tags y Multimedia', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);

        cy.contains(postTitle).click({ force: true });
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });
        cy.wait(1000);
        cy.get('a.gh-unsplash-button').contains('Insert image').click({ force: true });
        cy.wait(1000);
        cy.get('span').contains('Update').click( { force: true } );
        cy.url().should('include', '/editor/post');

        cy.visit('http://localhost:2369/ghost/#/posts');

        const tag1 = faker.lorem.word();
        const tag2 = faker.lorem.word();
        const tag3 = faker.lorem.word();
        const tags = [tag1, tag2, tag3];

        tags.forEach((tag, index) => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
        });
    
        cy.wait(1000);
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.wait(1000);
        cy.url().should('include', '/posts');

        cy.contains(postTitle).click({ force: true });
            cy.get('button.settings-menu-toggle').click();
            tags.forEach(tag => {
                cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
                cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
            });
    
            cy.get('span.settings-menu-open').click();
            cy.get('button.image-action.image-delete').click({ force: true });
            cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });
            cy.wait(1000);
            cy.get('a.gh-unsplash-button').contains('Insert image').first().click({ force: true });
            cy.wait(1000);
            cy.get('span').contains('Update').click({ force: true });
            cy.url().should('include', '/editor/post');
    });     

    it('Escenario 10: Crear un Post y Utilizar la Función de Vista Previa antes de Publicarlo', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Preview').click({ force: true });
        cy.get('div.gh-browserpreview-iframecontainer').should('be.visible');
        cy.get('span').contains('Preview').click({ force: true });
        cy.get('span').contains('Publish').click({ force: true });
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });  

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {
        function formatDateWithEsc(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-esc${month}-${day}`;
        }

        const futureDate = faker.date.future();
        const dateString = formatDateWithEsc(futureDate);
        const timeString = `${faker.datatype.number({ min: 0, max: 23 }).toString().padStart(2, '0')}:${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
        const title = faker.lorem.word() + faker.lorem.word();
        const content = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(content);
        cy.get('button.settings-menu-toggle').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', dateString);
        cy.get('input[data-test-date-time-picker-time-input=""]').invoke('val', timeString);
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
    });  

    it('Escenario 12: Crear una página estática', () => {
        const pageTitle = faker.lorem.sentence();
        const pageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/pages`);
        cy.contains(pageTitle).should('exist');
    });

    it('Escenario 13: Crear una Página y asignar tags', () => {
        const tags = [faker.lorem.word()];
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();

        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });

        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.contains(pageTitle).should('exist');

        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.contains(tags[0]).should('exist');
    });    

    it('Escenario 14: Editar una Página y Cambiar sus tags', () => {
        const tagtest1 = faker.lorem.word();
        const tagtest2 = faker.lorem.word();
        const tags = [tagtest1, tagtest2];
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.visit('http://localhost:2369/ghost/#/pages');
    
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
        });
    
        cy.wait(1000);
        cy.get('a[data-test-nav="pages"]').click();
        cy.wait(1000);
        cy.url().should('include', '/pages');
        cy.contains(pageTitle).click({ force: true });
        cy.wait(1000);
        cy.get('button.settings-menu-toggle').click();
        cy.wait(1000);
    
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });
    
        cy.get('span.settings-menu-open').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.contains(pageTitle).click({ force: true });
        cy.get('button.settings-menu-toggle').click();
        cy.contains(tagtest1);
        cy.contains(tagtest2);
    });    

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const page1 = faker.lorem.words();
        const page2 = faker.lorem.words();
        const page3 = faker.lorem.words();
        const pages = [page1, page2, page3];
    
        pages.forEach((page, index) => {
            const pageContent = faker.lorem.paragraph();
            cy.wait(1000);
            cy.visit('http://localhost:2369/ghost/#/pages');
            cy.wait(1000);
            cy.get('span').contains('New page').click({force: true});
            cy.get('textarea[placeholder="Page title"]').type(page, { force: true });
            cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent, { force: true });
            cy.get('span').contains('Publish').click({ force: true });
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
            cy.visit('http://localhost:2369/ghost/#/pages');
            cy.contains(page).should('exist');
        });
    });

    it('Escenario 16: Modificar una Página Estática', () => {
        const pageTitle = faker.lorem.word()+faker.lorem.word();
        const pageContent = faker.lorem.paragraph();
        const newPageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.wait(1000)
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.url().should('include', '/pages');
        cy.wait(1000)
        cy.contains(pageTitle).click({force: true});
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPageContent);
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/page');
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.contains(pageTitle).click();
        cy.contains(newPageContent).should('exist');
    });

    it('Escenario 17: Eliminar tag y Verificar en Página', () => {
        const tag = faker.lorem.word();
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();

        cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
        cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.wait(1000);

        cy.get('span').contains(tag).click({ force: true });
        cy.get('#tag-name').type(tag);
        cy.get('span').contains('Save').click();
        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.wait(1000);
        cy.contains(tag).click({ force: true });
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
    });  

    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const nombre = faker.name.firstName();
        const email = faker.internet.email();

        cy.get('a[href="#/members/"]').click();
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
            }
            else{
                cy.get('span').contains('New member').click();
            }
        });
    
        cy.url().should('include', '/members/new');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.get('span').contains('Save').click();
        cy.get('span').contains('Saved').should('exist');
        cy.contains(nombre).should('exist');
        cy.contains(email).should('exist');
    });   

    it('Escenario 19: Editar la Información de un Miembro y Cambiar el Estado de la Suscripción a la Newsletter', () => {
        const nombre = faker.name.firstName();
        const email = faker.internet.email();

        cy.get('a[href="#/members/"]').click();
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
            }
            else{
                cy.get('span').contains('New member').click();
            }
        });
    
        cy.url().should('include', '/members/new');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.get('span').contains('Save').click();
        cy.get('span').contains('Saved').should('exist');

        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/members')
        cy.wait(1000);
    
        cy.contains(nombre).click({ force: true });
        let isChecked = false;
        cy.get('input[data-test-checkbox="member-subscribed"]').then(($input) => {
            isChecked = $input.prop('checked');
        });
        cy.get('span.input-toggle-component').click();
        cy.get('input[data-test-checkbox="member-subscribed"]').then(($input) => {
            const tempIsChecked = $input.prop('checked');
            if (isChecked) {
                expect(tempIsChecked).to.be.false;
            }
            else {
                expect(tempIsChecked).to.be.true;
            }
        });
    
        cy.get('span').contains('Save').click();
        cy.get('span').contains('Saved').should('exist');
        cy.contains(nombre).should('exist');
    });    

    it('Escenario 20: Agregar Varios Miembros y Exportar su Lista', () => {
        const nombre1 = faker.name.firstName();
        const nombre2 = faker.name.firstName();
        const nombre3 = faker.name.firstName();
        const nombres = [nombre1, nombre2, nombre3];

        nombres.forEach(nombreRaw => {
            const email = faker.internet.email();
            cy.visit('http://localhost:2369/ghost/#/members');
            cy.url().should('include', '/members');
    
            cy.get("body").then($body => {
                if ($body.find("Add them manually").length > 0) {
                    cy.get('a').contains('Add them manually').click({ force: true });
                }
                else {
                    cy.get('span').contains('New member').click({ force: true });
                }
            });

            cy.url().should('include', '/members/new');
            cy.get('input[data-test-input="member-name"]').type(nombreRaw);
            cy.get('input[data-test-input="member-email"]').type(email);
            cy.get('span').contains('Save').click({ force: true });
            cy.get('span').contains('Saved').should('exist');
            cy.contains(nombreRaw).should('exist');
            cy.contains(email).should('exist');
        });
    
        cy.visit('http://localhost:2369/ghost/#/members');
        cy.url().should('include', '/members');
        cy.get('button[data-test-button="members-actions"]').click({ force: true });
        cy.get('span').contains('Export all members').click({ force: true });
    });

    it('Escenario 21: Publicar un Post con Título Excesivamente Largo', () => {
        //titulo tiene que ser un párrafo largo
        const postFirstTitle = faker.lorem.words();
        const postSecondTitle = faker.lorem.paragraph() + faker.lorem.paragraph();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postFirstTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').click();
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(postContent);
        cy.get('textarea[placeholder="Post title"]').clear().type(postSecondTitle);
        cy.get('span').contains('Publish').click({force: true});
        cy.contains('Validation failed: Title cannot be longer than 255 characters.');
    });

    it('Escenario 21: Publicar un Post con Título Excesivamente Largo', () => {
        const postFirstTitle = faker.lorem.words();
        const postSecondTitle = faker.lorem.paragraph() + faker.lorem.paragraph();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postFirstTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').click();
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('textarea[placeholder="Post title"]').clear().type(postSecondTitle);
        cy.get('span').contains('Publish').click({force: true});
        cy.contains('Validation failed: Title cannot be longer than 255 characters.');
    });

    it('Escenario 22: Creación de Post con Contenido Vacío', () => {
        const postTitle = faker.lorem.words();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.contains('span', 'Publish').should('not.exist');
    });

    it('Escenario 23: Uso de Tags No Permitidos en un Post', () => {
        const tags = [faker.lorem.paragraph() + faker.lorem.paragraph()];
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.sentence();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();

        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });

        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.contains('Validation error')
    });

    it('Escenario 24: Verificar Agregado de Miembro en Dashboard', () => {
        const nombre = faker.name.firstName();
        const email = faker.internet.email();

        cy.get('a[href="#/members/"]').click();
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
            }
            else{
                cy.get('span').contains('New member').click();
            }
        });
    
        cy.url().should('include', '/members/new');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.get('span').contains('Save').click();
        cy.get('span').contains('Saved').should('exist');
        cy.contains(nombre).should('exist');
        cy.contains(email).should('exist');

        cy.visit('http://localhost:2369/ghost/#/dashboard');
        cy.contains('6');
    });

    it('Escenario 25: Programar Publicación con Fecha Pasada', () => {
        function formatDateWithEsc(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-esc${month}-${day}`;
        }

        const pastDate = faker.date.past();
        const dateString = formatDateWithEsc(pastDate);
        const timeString = `${faker.datatype.number({ min: 0, max: 20 }).toString().padStart(2, '0')}:${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
        const title = faker.lorem.word() + faker.lorem.word();
        const content = faker.lorem.paragraph();
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(content);
        cy.get('button.settings-menu-toggle').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').clear();
        cy.get('input[data-test-date-time-picker-time-input=""]').clear();
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', dateString);
        cy.get('input[data-test-date-time-picker-time-input=""]').invoke('val', timeString);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
    });

    it('Escenario 26: Editar Post para Eliminar Todo el Contenido', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.wait(1000)
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.url().should('include', '/posts');
        cy.wait(1000)
        cy.contains(postTitle).click({force: true});
        cy.get('textarea[placeholder="Post title"]').clear();
        cy.get('p[data-koenig-dnd-droppable="true"]').clear();
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/post');
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.contains("(Untitled)");
    });

    it('Escenario  27: Crear Página Estática sin Título', () => {
        const pageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.wait(1000)
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.contains("(Untitled)");
    });

    it('Escenario 28: Asignar Tags Incorrectos a una Página', () => {
        const tags = [faker.lorem.paragraph() + faker.lorem.paragraph()];
        const pageTitle = faker.lorem.word()+ faker.lorem.word();
        const pageContent = faker.lorem.sentence();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();

        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });

        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.contains('Validation error')
    });

    it('Escenario 29: Eliminar Contenido de Página y Guardar', () => {
        const pageTitle = faker.lorem.word()+ faker.lorem.word();
        const pageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.wait(1000)
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.url().should('include', '/pages');
        cy.wait(1000)
        cy.contains(pageTitle).click({force: true});
        cy.get('textarea[placeholder="Page title"]').clear();
        cy.get('p[data-koenig-dnd-droppable="true"]').clear();
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/page');
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.contains("(Untitled)");
    });

    it('Escenario 30: Agregar un Miembro con Correo Electrónico Inválido', () => {
        const nombre = faker.name.firstName();
        const email = `invalid${faker.random.alphaNumeric(5)}@${faker.random.word()}.${
          faker.random.word()
        }`;
    
        cy.get('a[href="#/members/"]').click();
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
            }
            else{
                cy.get('span').contains('New member').click();
            }
        });
    
        cy.url().should('include', '/members/new');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.get('span').contains('Save').click();
    });

    it('Escenario 31: Crear un Post con Excerpt Normal', () => {
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const postExcerpt = faker.lorem.sentence();
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
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
        cy.get('textarea.post-setting-custom-excerpt').invoke('val').should('eq', postExcerpt);
    });

    it('Escenario 32: Crear un Post con Excerpt Muy Largo', () => {
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const postExcerpt = faker.lorem.paragraph()+faker.lorem.paragraph()+faker.lorem.paragraph()+faker.lorem.paragraph();
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('textarea.post-setting-custom-excerpt').type(postExcerpt);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click({force: true});
        cy.contains('Validation failed');
    });

    it('Escenario 33: Modificar Página Estática con URL Inválida', () => {
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const invalidUrl = `invalid-url-%<>{}[]|:^~#${faker.random.alphaNumeric(5)}`;
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
    
        cy.get('input.post-setting-slug').clear().type(invalidUrl, {force: true});
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);
    });

    it('Escenario 34: Crear Post con Tags Repetidos', () => {
        const tagtest1 = faker.lorem.word();
        const tags = [tagtest1, tagtest1, tagtest1];
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    });

    it('Escenario 35: Publicar Post con Enlaces Rotos', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });

    it('Escenario 36: Crear un Post con Code Injection Válido', () => {
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const codeInjection = `<script>alert('${faker.random.word()}')</script>`;
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.get('div.CodeMirror-scroll').first().type(codeInjection);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click({force: true});
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);
        cy.contains(postTitle).click({force: true});
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.contains(codeInjection);
    });

    it('Escenario 37: Uso de Caracteres Especiales en Títulos de Posts', () => {
        const specialCharacters = "!@#$%^&*()_+[]{};':,.<>/?`~";
        const postTitle = faker.lorem.word() + specialCharacters + faker.lorem.word();
        const postContent = faker.lorem.paragraph();
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    }); 

    it('Escenario 38: Introducir HTML o Scripts en el Contenido del Post', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = `<h1>${faker.lorem.sentence()}</h1><p>${faker.lorem.paragraph()}</p><script>alert('Test');</script>`;

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });   

    it('Escenario 39: Crear un Post con Code Injection Inválido', () => {
        const postTitle = faker.lorem.word() + faker.lorem.word();
        const postContent = faker.lorem.sentence();
        const codeInjection = faker.lorem.paragraph();
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.get('div.CodeMirror-scroll').first().type(codeInjection);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click({force: true});
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.wait(1000);
        cy.contains(postTitle).click({force: true});
        cy.get('button.settings-menu-toggle').click();
        cy.get('span').contains('Code injection').click();
        cy.contains(codeInjection);
    });
    
    it('Escenario 40: Crear un Post y Utilizar Caracteres no Convencionales en el Contenido', () => {
        const postTitle = faker.lorem.sentence();
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

    it('Escenario 41: Crear una Página con Excerpt Normal', () => {
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();
        const pageExcerpt = faker.lorem.sentence();
    
        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('textarea[name="post-setting-custom-excerpt"]').type(pageExcerpt);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
    
        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.wait(1000);
        cy.contains(pageTitle).click({force: true});
        cy.get('button.settings-menu-toggle').click();
        cy.get('textarea.post-setting-custom-excerpt').invoke('val').should('eq', pageExcerpt);
    });

    it('Escenario 42: Asignación de Tags Largos a un Post', () => {
        const tags = [faker.random.alphaNumeric(189)];
        const pageTitle = faker.lorem.word()+ faker.lorem.word();
        const pageContent = faker.lorem.sentence();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();

        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
        });

        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.wait(1000);
        cy.contains(pageTitle).click({force: true});
    });

    it('Escenario 43: Crear Post con URL Externas no Válidas', () => {
        const postTitle = faker.lorem.sentence();
        const postContent1 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;
        const postContent2 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;
        const postContent3 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent1 + " " + postContent2 + " " + postContent3);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });

    it('Escenario 44: Crear Página Estática con Título Demasiado Largo', () => {
        //titulo tiene que ser un párrafo largo
        const pageFirstTitle = faker.lorem.words();
        const pageSecondTitle = faker.lorem.paragraph() + faker.lorem.paragraph() + faker.lorem.paragraph();
        const pageContent = faker.lorem.paragraph();

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageFirstTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').click();
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(pageContent);
        cy.get('textarea[placeholder="Page title"]').clear().type(pageSecondTitle);
        cy.get('span').contains('Publish').click({force: true});
        cy.contains('Validation failed: Title cannot be longer than 255 characters.');
    });

    it('Escenario 45: Crear una Página con Excerpt Muy Largo', () => {
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();
        const pageExcerpt = faker.lorem.paragraph()+faker.lorem.paragraph()+faker.lorem.paragraph()+faker.lorem.paragraph();
    
        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('textarea.post-setting-custom-excerpt').type(pageExcerpt);
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click({force: true});
        cy.contains('Validation failed');
    });

    it('Escenario 46: Crear un Post con Contenido que Exceda el Límite Máximo', () => {
        const postTitle = faker.lorem.sentence();
        let postContent = '';
        for (let i = 0; i < 1; i++) {
            postContent += faker.lorem.paragraph(40) + ' ';
        }

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });

    it('Escenario 47: Programar Publicación para Fecha Inexistente', () => {
        const title = faker.lorem.word() + faker.lorem.word();
        const content = faker.lorem.paragraph();
        const invalidMonth = faker.datatype.number({ min: 13, max: 99 });
        const invalidDay = faker.datatype.number({ min: 32, max: 99 });
        const year = new Date().getFullYear();
        const dateString = `${year}-esc${invalidMonth}-${invalidDay}`;
        const timeString = `${faker.datatype.number({ min: 0, max: 23 }).toString().padStart(2, '0')}:${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(content);
        cy.get('button.settings-menu-toggle').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').clear().type(dateString, {force: true});
        cy.get('input[data-test-date-time-picker-time-input=""]').clear().type(timeString, {force: true});
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    });

    it('Escenario 48: Crear una Página con Code Injection Válido', () => {
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();
        const codeInjection = `<script>alert('${faker.random.word()}')</script>`;
    
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

    it('Escenario 49: Crear Post con Uso Excesivo de Negritas o Itálicas', () => {
        const postTitle = `<strong>${faker.lorem.sentence()}</strong>`;
        const postContent = `<em>${faker.lorem.paragraph()}</em>`;
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle, { parseSpecialCharSequences: false });
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent, { parseSpecialCharSequences: false });
    
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });

    it('Escenario 51: Cambio Masivo de Tags en Múltiples Posts', () => {
        for (let i = 0; i < 3; i++) {
            const tagtest1 = faker.lorem.word();
            const tagtest2 = faker.lorem.word();
            const tags = [tagtest1, tagtest2];
            const postTitle = faker.lorem.word() + faker.lorem.word();
            const postContent = faker.lorem.paragraph();
    
            cy.wait(1000);
            cy.visit(`http://localhost:2369/ghost/#/posts`);
            cy.wait(1000);
            cy.get('span').contains('New post').click();
            cy.url().should('include', '/editor/post');
            cy.get('textarea[placeholder="Post title"]').type(postTitle);
            cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
            cy.get('span').contains('Publish').click();
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
            cy.visit('http://localhost:2369/ghost/#/posts');
    
            tags.forEach(tag => {
                cy.get('a[data-test-nav="tags"]').click();
                cy.url().should('include', '/tags');
                cy.get('span').contains('New tag').click();
                cy.get('input[id="tag-name"]').type(tag);
                cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
                cy.get('a[data-test-nav="tags"]').click();
            });
    
            cy.wait(1000);
            cy.get('a[data-test-nav="posts"]').click();
            cy.wait(1000);
            cy.url().should('include', '/posts');
            cy.contains(postTitle).click({ force: true });
            cy.get('button.settings-menu-toggle').click();
    
            tags.forEach(tag => {
                cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
                cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tag}{enter}`);
            });
    
            cy.get('span.settings-menu-open').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Update').click({ force: true});
            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.contains(postTitle).click({ force: true });
            cy.get('button.settings-menu-toggle').click();
            cy.contains(tagtest1);
            cy.contains(tagtest2);
        }
    });

    it('Escenario 52: Crear un Post y Asignar un Tag No Existente', () => {
        const tagNoExistente = faker.lorem.word();
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.sentence();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('button.settings-menu-toggle').click();
        cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
        cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').type(`${tagNoExistente}{enter}`);
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2369/ghost/#/posts');
        cy.contains(postTitle).should('exist');
        cy.visit('http://localhost:2369/ghost/#/tags');
        cy.contains(tagNoExistente).should('exist');
    });

    it('Escenario 53: Incluir Caracteres Especiales en URLs de Páginas Estáticas', () => {
        const pageTitle = faker.lorem.word() + faker.lorem.word();
        const pageContent = faker.lorem.sentence();
        const invalidUrl = `invalid-url-%<>{}[]|:^~#${faker.random.alphaNumeric(5)}`;
    
        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('button.settings-menu-toggle').click();
    
        cy.get('input.post-setting-slug').clear().type(invalidUrl, {force: true});
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
    
        cy.wait(1000);
        cy.visit('http://localhost:2369/ghost/#/pages');
        cy.wait(1000);
    });

    it('Escenario 54: Publicar Post con Títulos de Sección Repetidos', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraph();
    
        for (let i = 0; i < 2; i++) {
            cy.wait(1000);
            cy.visit(`http://localhost:2369/ghost/#/posts`);
            cy.wait(1000);
            cy.url().should('include', '/posts');
            cy.get('span').contains('New post').click();
            cy.url().should('include', '/editor/post');
            cy.get('textarea[placeholder="Post title"]').type(postTitle);
            cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
            cy.get('span').contains('Publish').click();
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
            cy.visit(`http://localhost:2369/ghost/#/posts`);
            cy.contains(postTitle).should('exist');
            cy.wait(1000);
        }
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

    it('Escenario 56: Editar un Post y Cambiar su URL Slug a una Ya Existente', () => {
        const url = faker.lorem.word() + faker.lorem.word();
    
        for (let i = 0; i < 2; i++) {
            const postTitle = faker.lorem.word() + faker.lorem.word();
            const postContent = faker.lorem.sentence();
    
            cy.wait(1000);
            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.wait(1000);
            cy.url().should('include', '/posts');
            cy.get('span').contains('New post').click();
            cy.url().should('include', '/editor/post');
            cy.get('textarea[placeholder="Post title"]').type(postTitle);
            cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
            cy.get('button.settings-menu-toggle').click();
            cy.get('input.post-setting-slug').clear().type(url, {force: true});
            cy.get('span.settings-menu-open').click();
            cy.get('span').contains('Publish').click();
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
            cy.wait(1000);
            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.wait(1000);
        }
    });

    it('Escenario 57: Crear un Post y Agregar Enlaces Internos Rotos', () => {
        const postTitle = faker.lorem.word()+ faker.lorem.word();
        const postContent = faker.lorem.paragraph();

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2369/ghost/#/posts');
    
        for (let i = 1; i <= 3; i++) {
            const postContent1 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;
            const postContent2 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;
            const postContent3 = `https://www.invalid-${faker.random.alphaNumeric(5)}@${faker.random.word()}.com`;
            const newPostContent = postContent1 + " " + postContent2 + " " + postContent3;
            cy.wait(1000);
            cy.visit('http://localhost:2369/ghost/#/posts');
            cy.wait(1000);
            cy.contains(postTitle).click({force: true});
            cy.url().should('include', '/editor/post');
            cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPostContent);
            cy.get('span').contains('Update').click();
            cy.url().should('include', '/editor/post');
            cy.contains(newPostContent).should('exist');
        }
    });

    it('Escenario 58: Programar Publicación de Post en Fecha con Formato Incorrecto', () => {
        const title = faker.lorem.word() + faker.lorem.word();
        const content = faker.lorem.paragraph();
        const dateString = `fecha-${faker.datatype.number({min: 1000, max: 9999})}-${faker.lorem.word()}`;
        const timeString = `${faker.datatype.number({ min: 0, max: 23 }).toString().padStart(2, '0')}:${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`;
    
        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(content);
        cy.get('button.settings-menu-toggle').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').clear().type(dateString, {force: true});
        cy.get('input[data-test-date-time-picker-time-input=""]').clear().type(timeString, {force: true});
    
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    });

    it('Escenario 59: Crear Página Estática con Contenido Excesivamente Largo', () => {
        const pageTitle = faker.lorem.sentence();
        let pageContent = '';
        for (let i = 0; i < 1; i++) {
            pageContent += faker.lorem.paragraph(40) + ' ';
        }

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.visit(`http://localhost:2369/ghost/#/pages`);
        cy.contains(pageTitle).should('exist');
    });

    it('Escenario 60: Crear un Miembro con un Note muy Largo', () => {
        const nombre = faker.name.firstName();
        const email = faker.internet.email();
        const note = faker.random.alphaNumeric(499);
    
        cy.get('a[href="#/members/"]').click();
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
            }
            else{
                cy.get('span').contains('New member').click();
            }
        });
    
        cy.url().should('include', '/members/new');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.get('textarea[name="note"]').type(note);
    
        cy.get('span').contains('Save').click();
        cy.get('span').contains('Saved').should('exist');
        cy.contains(nombre).should('exist');
        cy.contains(email).should('exist');
    });






    
});