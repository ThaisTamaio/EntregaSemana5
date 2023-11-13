describe('Ghost Post Creation and Publication', () => {
    beforeEach(() => {
        cy.visit('http://localhost:2370/ghost/');
        cy.get('input[name="identification"]').type('pruebas@gmail.com');
        cy.get('input[name="password"]').type('pruebas1234');
        cy.get('span').contains('Sign in').click();

        // Manejar excepciones no capturadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Imprime el error en la consola
            console.error('Se detectó una excepción no capturada:', err);

            // Retorna false para que Cypress ignore la excepción y no falle la prueba
            return false;
        });
    });

    it('Escenario 1: Creación y publicación de un post', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test 1');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 1');

        // Publicar el post
        cy.get('span').contains('Publish').click();

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2370/test-1/');

        // Verificar el contenido y el título del post
        cy.contains('contenido test 1').should('exist');
        cy.contains('Test 1').should('exist');
    });

    it('Escenario 2: Modificar un post existente', () => {
        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Seleccionar el post a editar
        cy.contains('h3', 'Test 1').click();

        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/post');

        // Borrar el contenido actual y escribir el nuevo contenido
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type('Contenido modificado');

        // Actualizar el post
        cy.get('span').contains('Update').click();

        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/post');

        // Navegar a la vista del post
        cy.get('a').contains('Published').click();

        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2370/test-1/');

        // Verificar el contenido modificado
        cy.contains('Contenido modificado').should('exist');
    });

    it('Escenario 3: Crear un Post y asignar tags', () => {
        const tags = ['tagTestPost'];
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test 2');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 2');

        // Asignar tags al post
        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();

        // Publicar el post
        cy.get('span').contains('Publish').click();

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2370/test-1/');

        // Verificar el contenido y el título del post
        cy.contains('contenido test 2').should('exist');
        cy.contains('Test 2').should('exist');

        // Verificar el tag en el post visitando la página
        cy.visit('http://localhost:2370/tag/tagTestPost/');
        cy.contains('Test 2').should('exist');
    });

    it('Escenario 4: Editar un Post y Cambiar sus tags', () => {
        // Crear tags
        const tags = ['tagtest1', 'tagtest2', 'tagtest3', 'tagtest4', 'tagtest5'];
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
            cy.contains(tag).should('exist');
        });

        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();
        cy.url().should('include', '/posts');

        // Seleccionar el post "Test 1" para editar
        cy.contains('h3', 'Test 1').click();

        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();


        // Actualizar el post
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();

        // Verificar el tag en el post visitando la página
        cy.visit('http://localhost:2370/tag/tagtest1/');
        cy.contains('Test 1').should('exist');

    });

    it('Escenario 5: Eliminar tag y Verificar en Post', () => {
        // Navegar a la sección de tags
        cy.get('a[data-test-nav="tags"]').click();
        cy.url().should('include', '/tags');

        // Seleccionar el tag "tagtest1" para eliminar
        cy.contains('h3', 'tagtest1').click();

        // Eliminar el tag
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
        //** (uncaught exception)TransitionAborted: TransitionAborted */

        // Verificar que el tag "tagtest1" ha sido eliminado visitando la página del post
        cy.visit('http://localhost:2370/test-1/');
        cy.get('a.gh-article-tag[href="http://localhost:2370/tag/tagtest1/"]').should('not.exist');

    });

    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples veces', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test multiple edits');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test multiple edits');

        // Publicar el post
        cy.get('span').contains('Publish').click();

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        // Inicio del bucle para editar y verificar el post 5 veces
        for (let i = 1; i <= 5; i++) {
            // Navegar a la sección de posts
            cy.visit('http://localhost:2370/ghost/');
            cy.get('a[href="#/posts/"]').click({ multiple: true, force: true});

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/posts');

            // Seleccionar el post a editar
            cy.contains('h3', 'Test multiple edits').click();

            // Esperar a que la página del editor se cargue
            cy.url().should('include', '/editor/post');

            // Borrar el contenido actual y escribir el nuevo contenido
            cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(`Contenido modificado ${i}`);

            // Actualizar el post
            cy.get('span').contains('Update').click();

            // Esperar a que se complete la actualización
            cy.url().should('include', '/editor/post');

            // Navegar a la vista del post
            cy.get('a').contains('Published').click();

            // Navegar directamente a la URL del post actualizado
            cy.visit('http://localhost:2370/test-multiple-edits/');

            // Verificar el contenido modificado
            cy.contains(`Contenido modificado ${i}`).should('exist');
        }
    });

    it('Escenario 7: Crear un Post y luego Agregarle Elementos Multimedia', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test multimedia');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test multimedia');
    
        // Publicar el post
        cy.get('span').contains('Publish').click();
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();
    
        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2370/test-multimedia/');
    
        // Verificar el contenido y el título del post
        cy.contains('contenido test multimedia').should('exist');
        cy.contains('Test multimedia').should('exist');
    
        // Navegar a la sección de posts
        cy.visit('http://localhost:2370/ghost/');
    
        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();
        cy.url().should('include', '/posts');
    
        // Seleccionar el post "Test multimedia" para editar
        cy.contains('h3', 'Test multimedia').click();
    
        // Hacer clic en el botón para insertar una imagen de Unsplash
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });

        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el primer botón de Unsplash que dice "Insert image" esté visible y luego hacer clic, forzando el clic
        cy.get('a.gh-unsplash-button').contains('Insert image').first().click({ force: true });

        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el botón de Update esté disponible y hacer clic
        cy.get('span').contains('Update').should('be.visible').click();
    
        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/post');
    
        // Navegar a la vista del post
        cy.get('a').contains('Published').click();
    }); 

    it('Escenario 8: Crear una Serie de Posts Relacionados con Tags Comunes', () => {
        const posts = ['post1', 'post2', 'post3'];
        const tags = ['tagEscenario8'];
        //Crear varios posts con el mismo tag
        posts.forEach(post => {
            // Ir a la página de posts
            cy.visit('http://localhost:2370/ghost/#/posts');

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/posts');

            // Crear un nuevo post
            cy.get('span').contains('New post').click();

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/editor/post');

            // Llenar el título y el contenido del post
            cy.get('textarea[placeholder="Post title"]').type(post);
            cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido '+post);

            // Asignar tags al post
            // Abrir la configuración del post
            cy.get('button.settings-menu-toggle').click();

            // Asignar los tags al post
            tags.forEach(tag => {
                cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
                cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
            });

            // Hacer clic en el botón de configuración del post antes de verificar el tag
            cy.get('span.settings-menu-open').click();

            // Publicar el post
            cy.get('span').contains('Publish').click();

            // Esperar a que aparezca el botón de confirmación
            cy.get('span').contains('Continue, final review').click();

            // Confirmar la publicación
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

            // Navegar al post publicado
            cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

            // Verificar el contenido y el título del post
            cy.contains('contenido '+post).should('exist');
            cy.contains(post).should('exist');

            // Verificar el tag en el post visitando la página
            tags.forEach(tag => {
                cy.visit('http://localhost:2370/tag/'+tag+'/');
                cy.contains(post).should('exist');
            });
        });
    });

    it('Escenario 9: Modificar un Post para Cambiar su Enfoque y Actualizar Tags y Multimedia', () => {
        // Crear tags
        const tags = ['nuevoEnfoqueTag1', 'nuevoEnfoqueTag2', 'nuevoEnfoqueTag3'];
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
            cy.contains(tag).should('exist');
        });

        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.url().should('include', '/posts');

        // Seleccionar la Página "Contacto test" para editar
        cy.contains('h3', 'Test multimedia').click();

        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();

        // Hacer clic en el botón para eliminar la imagen actual
        cy.get('button.image-action.image-delete').click({ force: true });

        // Hacer clic en el botón para insertar una imagen de Unsplash
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });

        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el primer botón de Unsplash que dice "Insert image" esté visible y luego hacer clic, forzando el clic
        cy.get('a.gh-unsplash-button').contains('Insert image').first().click({ force: true });

        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el botón de Update esté disponible y hacer clic
        cy.get('span').contains('Update').should('be.visible').click();
    
        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/post');
    
        // Navegar a la vista del post
        cy.get('a').contains('Published').click();

    });

    it('Escenario 10: Crear un Post y Utilizar la Función de Vista Previa antes de Publicarlo', () => {
        //title const
        const title = 'New preview post';
        const content = 'Contenido de new preview post';

        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content);

        // Ver preview
        cy.get('span').contains('Preview').click();

        //wait for preview
        cy.wait(500);

        //check if div.tabs is visible
        cy.get('div.tabs').should('be.visible');
        cy.get('div.gh-browserpreview-iframecontainer').should('be.visible');

        cy.get('span').contains('Preview').click({force: true});

        // Publicar el post
        cy.get('span').contains('Publish').click({force: true});

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2370/test-1/');

        // Verificar el contenido y el título del post
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
    });

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {
        //title const
        const title = 'New programmed post';
        const content = 'Contenido de new programmed post';
        const date = '2023-11-11';
        const time = '11:11';

        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content);

        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Configurar la fecha y hora de publicación
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', date);
        cy.get('input[data-test-date-time-picker-time-input=""]').invoke('val', time);

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();

        // Publicar el post
        cy.get('span').contains('Publish').click();

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

        // Verificar el contenido y el título del post
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
    });

    it('Escenario 12: Crear una página estática', () => {
        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/pages');

        // Crear una nueva página
        cy.get('span').contains('New page').click();

        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');

        // Llenar el título y el contenido de la página
        cy.get('textarea[placeholder="Page title"]').type('Contacto test');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test');

        // Publicar la página
        cy.get('span').contains('Publish').click();

        // Confirmar la publicación
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        // Visitar la página publicada
        cy.visit('http://localhost:2370/contacto-test/');

        // Verificar el título y el contenido de la página
        cy.contains('Contacto test').should('exist');
        cy.contains('contenido test').should('exist');
    });

    it('Escenario 13: Crear una Página y asignar tags', () => {
        const tags = ['tagTestPage'];
        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click();
        cy.url().should('include', '/pages');

        // Crear una nueva página
        cy.get('span').contains('New page').click();

        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');

        // Llenar el título y el contenido de la página
        cy.get('textarea[placeholder="Page title"]').type('Pagina test 2');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 2');

        // Asignar tags a la pagina
        // Abrir la configuración de la pagina
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags a la pagina
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });

        // Hacer clic en el botón de configuración de la página antes de verificar el tag
        cy.get('span.settings-menu-open').click();

        // Publicar la página
        cy.get('span').contains('Publish').click();

        // Confirmar la publicación
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

        // Visitar la página publicada
        cy.visit('http://localhost:2370/pagina-test-2/');

        // Verificar el contenido y el título de la página
        cy.contains('contenido test 2').should('exist');
        cy.contains('Pagina test 2').should('exist');
    });

    it('Escenario 14: Editar una Página y Cambiar sus tags', () => {
        // Crear tags
        const tags = ['tagtest6', 'tagtest7', 'tagtest8', 'tagtest9', 'tagtest10'];
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
            cy.contains(tag).should('exist');
        });

        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click();
        cy.url().should('include', '/pages');

        // Seleccionar la Página "Contacto test" para editar
        cy.contains('h3', 'Contacto test').click();

        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();


        // Actualizar el post
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();

        // Verificar que se haya asignado el tag
        cy.contains('Updated').should('exist');

    });

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const pages = ['page1', 'page2', 'page3'];
        //iterar sobre las paginas
        pages.forEach(page => {

            // Navegar a la sección de paginas
            cy.visit('http://localhost:2370/ghost/#/pages');

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/pages');

            // Crear una nueva página
            cy.get('span').contains('New page').click();

            // Esperar a que la página del editor se cargue
            cy.url().should('include', '/editor/page');

            // Llenar el título y el contenido de la página
            cy.get('textarea[placeholder="Page title"]').type(page);
            cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido '+page);

            // Publicar la página
            cy.get('span').contains('Publish').click();

            // Confirmar la publicación
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();

            // Verificar el título y el contenido de la página
            cy.contains(page).should('exist');
            cy.contains('contenido '+page).should('exist');
        });
    });

    it('Escenario 16: Modificar una Página Estática', () => {
        const newContent = 'Contenido modificado'+Math.floor(Math.random() * 1000);

        // Navegar a la sección de posts
        cy.get('a[data-test-nav="pages"]').click();

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/pages');

        // Seleccionar el post a editar
        cy.contains('h3', 'page1').first().click();

        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');

        // Borrar el contenido actual y escribir el nuevo contenido
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newContent);

        // Actualizar el post
        cy.get('span').contains('Update').click();

        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/page');

        // Navegar a la vista del post
        cy.get('a').contains('Published').click();

        // Verificar el contenido modificado
        cy.contains(newContent).should('exist');
    });

    it('Escenario 17: Eliminar tag y Verificar en Página', () => {
        // Navegar a la sección de tags
        cy.get('a[data-test-nav="tags"]').click();
        cy.url().should('include', '/tags');

        // Seleccionar el tag "tagtest1" para eliminar
        cy.contains('h3', 'tagtest6').click();

        // Eliminar el tag
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
        //** (uncaught exception)TransitionAborted: TransitionAborted */

        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click();
        cy.url().should('include', '/pages');

        // Seleccionar la Página "Contacto test" para editar
        cy.contains('h3', 'Contacto test').click();

        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        //testtag6 should not exist
        cy.contains('tagtest6').should('not.exist');
    });

});