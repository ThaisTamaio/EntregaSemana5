describe('Ghost Post Creation and Publication', () => {
    beforeEach(() => {
        cy.visit('http://localhost:2368/ghost/');
        cy.get('input[name="identification"]').type('pruebas@gmail.com');
        cy.get('input[name="password"]').type('pruebas1234');
        cy.get('span').contains('Sign in').click();

        // Manejar excepciones no capturadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Se detectó una excepción no capturada:', err);
            return false;
        });
    });

    it('Escenario 1: Creación y publicación de un post', () => {
        const postTitle = "Titulo1"
        const postContent = "Contenido1"

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2368/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });    

    it('Escenario 2: Modificar un post existente', () => {
        const postTitle = "Titulo2"
        const postContent = "Contenido2"
        const newPostContent = "NuevoContenido2"

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
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.url().should('include', '/posts');
        cy.wait(1000)
        cy.contains(postTitle).click({force: true});
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPostContent);
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/post');
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.contains(postTitle).click();
        cy.contains(newPostContent).should('exist');
    });    

    it('Escenario 3: Crear un Post y asignar tags', () => {
        const tags = ["tag1", "tag2"];
        const postTitle = "Titulo3";
        const postContent = "Contenido3";

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

        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.contains(postTitle).should('exist');

        cy.visit('http://localhost:2368/ghost/#/tags');
        cy.contains(tags[0]).should('exist');
    });

    it('Escenario 4: Editar un Post y Cambiar sus tags', () => {
        const tagtest1 = "tag3";
        const tagtest2 = "tag4";
        const tags = [tagtest1, tagtest2];
        const postTitle = "Titulo4";
        const postContent = "Contenido4";

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2368/ghost/#/posts');
    
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
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.contains(postTitle).click({ force: true });
        cy.get('button.settings-menu-toggle').click();
        cy.contains(tagtest1);
        cy.contains(tagtest2);
    });
    
    it('Escenario 5: Eliminar tag y Verificar en Post', () => {
        const tagName = "tag5"
        cy.get('a[href="#/tags/"]').click();
        cy.url().should('include', '/tags');
        cy.get('span').contains('New tag').click();
        cy.get('#tag-name').type(tagName);
        cy.get('span').contains('Save').click();
        cy.visit('http://localhost:2368/ghost/#/tags');
        cy.wait(1000);
        cy.contains(tagName).click({ force: true });
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
    });
    
    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples veces', () => {
        const postTitle = "Titulo6";
        const postContent = "Contenido6";

        cy.get('a[href="#/posts/"]').click();
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit('http://localhost:2368/ghost/#/posts');
    
        for (let i = 1; i <= 3; i++) {
            const newPostContent = "Contenido6-" + i;
            cy.visit('http://localhost:2368/ghost/');
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
        const postTitle = "Titulo7";
        const postContent = "Contenido7";

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
        cy.visit('http://localhost:2368/ghost/#/posts');
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
        const post1 = "Titulo8-1";
        const post2 = "Titulo8-2";
        const post3 = "Titulo8-3";
        const tag = "tag8";
        const posts = [post1, post2, post3];
        const tags = [tag];

        posts.forEach(post => {
            const postContent= "Contenido8";
            cy.visit('http://localhost:2368/ghost/#/posts');
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

            cy.visit('http://localhost:2368/ghost/#/posts');
            cy.contains(postContent).should('exist');

            cy.visit('http://localhost:2368/ghost/#/tags');
            cy.contains(tag).should('exist');
        });
    });   
    
    it('Escenario 9: Modificar un Post para Cambiar su Enfoque y Actualizar Tags y Multimedia', () => {
        const postTitle = "Titulo9";
        const postContent = "Contenido9";

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
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.wait(1000);

        cy.contains(postTitle).click({ force: true });
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });
        cy.wait(1000);
        cy.get('a.gh-unsplash-button').contains('Insert image').click({ force: true });
        cy.wait(1000);
        cy.get('span').contains('Update').click( { force: true } );
        cy.url().should('include', '/editor/post');

        cy.visit('http://localhost:2368/ghost/#/posts');

        const tag1 = "tag9-1";
        const tag2 = "tag9-2";
        const tag3 = "tag9-3";
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
        const postTitle = "Titulo10";
        const postContent = "Contenido10";

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
        cy.visit(`http://localhost:2368/ghost/#/posts`);
        cy.contains(postTitle).should('exist');
    });  

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {

        const dateString  = "2023-12-31";
        const timeString = "14:30";
        const title = "Titulo11";
        const content = "Contenido11";

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
        const pageTitle = "Titulo12";
        const pageContent = "Contenido12";

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.visit(`http://localhost:2368/ghost/#/pages`);
        cy.contains(pageTitle).should('exist');
    });

    it('Escenario 13: Crear una Página y asignar tags', () => {
        const tags = ["tag13"];
        const pageTitle = "Titulo13";
        const pageContent = "Contenido13";

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

        cy.visit('http://localhost:2368/ghost/#/pages');
        cy.contains(pageTitle).should('exist');

        cy.visit('http://localhost:2368/ghost/#/tags');
        cy.contains(tags[0]).should('exist');
    });    

    it('Escenario 14: Editar una Página y Cambiar sus tags', () => {
        const tagtest1 = "tag14-1";
        const tagtest2 = "tag14-2";
        const tags = [tagtest1, tagtest2];
        const pageTitle = "Titulo14";
        const pageContent = "Contenido14";

        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/pages');
        cy.get('span').contains('New page').click();
        cy.url().should('include', '/editor/page');
        cy.get('textarea[placeholder="Page title"]').type(pageTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent);
        cy.get('span').contains('Publish').click();
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
        cy.visit('http://localhost:2368/ghost/#/pages');
    
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
        cy.visit('http://localhost:2368/ghost/#/pages');
        cy.contains(pageTitle).click({ force: true });
        cy.get('button.settings-menu-toggle').click();
        cy.contains(tagtest1);
        cy.contains(tagtest2);
    });    

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const page1 = "Titulo15-1";
        const page2 = "Titulo15-2";
        const page3 = "Titulo15-3";
        const pages = [page1, page2, page3];
    
        pages.forEach((page, index) => {
            const pageContent = "Contenido15";
            cy.wait(1000);
            cy.visit('http://localhost:2368/ghost/#/pages');
            cy.wait(1000);
            cy.get('span').contains('New page').click({force: true});
            cy.get('textarea[placeholder="Page title"]').type(page, { force: true });
            cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent, { force: true });
            cy.get('span').contains('Publish').click({ force: true });
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
            cy.visit('http://localhost:2368/ghost/#/pages');
            cy.contains(page).should('exist');
        });
    });

    it('Escenario 16: Modificar una Página Estática', () => {
        const pageTitle = "Titulo16";
        const pageContent = "Contenido16";
        const newPageContent = "NuevoContenido16";

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
        cy.visit('http://localhost:2368/ghost/#/pages');
        cy.url().should('include', '/pages');
        cy.wait(1000)
        cy.contains(pageTitle).click({force: true});
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPageContent);
        cy.get('span').contains('Update').click({ force: true });
        cy.url().should('include', '/editor/page');
        cy.visit('http://localhost:2368/ghost/#/pages');
        cy.contains(pageTitle).click();
        cy.contains(newPageContent).should('exist');
    });

    it('Escenario 17: Eliminar tag y Verificar en Página', () => {
        const tag = "tag17";
        const pageTitle = "Titulo17";
        const pageContent = "Contenido17";

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
        cy.visit('http://localhost:2368/ghost/#/tags');
        cy.wait(1000);

        cy.get('span').contains(tag).click({ force: true });
        cy.get('#tag-name').type(tag);
        cy.get('span').contains('Save').click();
        cy.visit('http://localhost:2368/ghost/#/tags');
        cy.wait(1000);
        cy.contains(tag).click({ force: true });
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
    });  

    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const nombre = "Nombre18";
        const email = "nombre18@gmail.com";

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
        const nombre = "Nombre19";
        const email = "nombre19@gmail.com";

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
        cy.visit('http://localhost:2368/ghost/#/members')
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
        const nombre1 = "nombre20-1";
        const nombre2 = "nombre20-2";
        const nombre3 = "nombre20-3";
        const nombres = [nombre1, nombre2, nombre3];

        nombres.forEach(nombreRaw => {
            const email = nombreRaw + "@gmail.com";
            cy.visit('http://localhost:2368/ghost/#/members');
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
    
        cy.visit('http://localhost:2368/ghost/#/members');
        cy.url().should('include', '/members');
        cy.get('button[data-test-button="members-actions"]').click({ force: true });
        cy.get('span').contains('Export all members').click({ force: true });
    });
    
});