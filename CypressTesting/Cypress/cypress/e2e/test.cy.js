describe('Ghost Post Creation and Publication', () => {
    beforeEach(() => {
        cy.visit('http://localhost:2368/ghost/');
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
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v5-esc1-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v5-esc1-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test 1');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 1');
    
        // Tomar un screenshot después de llenar el título y contenido
        cy.screenshot(`v5-esc1-Llenar-titulo-y-contenido`);
    
        // Publicar el post
        cy.get('span').contains('Publish').click();
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc1-Clic-en-Publish`);
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();
    
        // Tomar un screenshot después de hacer clic en "Continue, final review"
        cy.screenshot(`v5-esc1-Clic-en-Continue-final-review`);
    
        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        // Tomar un screenshot después de hacer clic en "Publish post, right now"
        cy.screenshot(`v5-esc1-Clic-en-Publish-post-right-now`);
    
        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();
    
        // Tomar un screenshot después de navegar al post publicado
        cy.screenshot(`v5-esc1-Navegar-al-post-publicado`);
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2368/test-1/');
    
        // Tomar un screenshot después de visitar la URL del post actualizado
        cy.screenshot(`v5-esc1-Visitar-URL-del-post-actualizado`);
    
        // Verificar el contenido y el título del post
        cy.contains('contenido test 1').should('exist');
        cy.contains('Test 1').should('exist');
    });    

    it('Escenario 2: Modificar un post existente', () => {
        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v5-esc2-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Seleccionar el post a editar
        cy.contains('Test 1').first().click();
    
        // Tomar un screenshot después de seleccionar el post a editar
        cy.screenshot(`v5-esc2-Seleccionar-el-post-a-editar`);
    
        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/post');
    
        // Borrar el contenido actual y escribir el nuevo contenido
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type('Contenido modificado');
    
        // Tomar un screenshot después de modificar el contenido
        cy.screenshot(`v5-esc2-Modificar-el-contenido`);
    
        // Actualizar el post
        cy.get('span').contains('Update').click();
    
        // Tomar un screenshot después de hacer clic en "Update"
        cy.screenshot(`v5-esc2-Clic-en-Update`);
    
        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/post');
    
        // Navegar a la vista del post
        cy.get('a').contains('Published').click();
    
        // Tomar un screenshot después de navegar a la vista del post
        cy.screenshot(`v5-esc2-Navegar-a-la-vista-del-post`);
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2368/test-1/');
    
        // Tomar un screenshot después de visitar la URL del post actualizado
        cy.screenshot(`v5-esc2-Visitar-URL-del-post-actualizado`);
    
        // Verificar el contenido modificado
        cy.contains('Contenido modificado').should('exist');
    });    

    it('Escenario 3: Crear un Post y asignar tags', () => {
        const tags = ['tagTestPost'];
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();
        cy.screenshot('v5-esc3-navegarSeccionPosts');

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');

        // Crear un nuevo post
        cy.get('span').contains('New post').click();
        cy.screenshot('v5-esc3-crearNuevoPost');

        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');

        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test 2');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 2');
        cy.screenshot('v5-esc3-llenarTituloContenido');

        // Asignar tags al post
        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();

        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });
        cy.screenshot('v5-esc3-asignarTags');

        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();

        // Publicar el post
        cy.get('span').contains('Publish').click();
        cy.screenshot('v5-esc3-publicarPost');

        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();

        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.screenshot('v5-esc3-confirmarPublicacion');

        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();

        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2368/test-1/');

        // Verificar el contenido y el título del post
        cy.contains('contenido test 2').should('exist');
        cy.contains('Test 2').should('exist');

        // Verificar el tag en el post visitando la página
        cy.visit('http://localhost:2368/tag/tagTestPost/');
        cy.contains('Test 2').should('exist');
        cy.screenshot('v5-esc3-verificarTag');
    });

    it('Escenario 4: Editar un Post y Cambiar sus tags', () => {
        const tags = ['tagtest1', 'tagtest2', 'tagtest3', 'tagtest4', 'tagtest5'];
    
        // Crear tags
        tags.forEach(tag => {
            cy.get('a[data-test-nav="tags"]').click();
            cy.url().should('include', '/tags');
            cy.get('span').contains('New tag').click();
            cy.get('input[id="tag-name"]').type(tag);
            cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
            cy.get('a[data-test-nav="tags"]').click();
        });
    
        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();
        cy.url().should('include', '/posts');
    
        // Seleccionar el post "Test 1" para editar
        cy.contains('Test 1').should('be.visible').first().click();
    
        // Tomar un screenshot después de seleccionar el post para editar
        cy.screenshot(`v5-esc4-Seleccionar-el-post-para-editar`);
    
        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();
    
        // Tomar un screenshot después de abrir la configuración del post
        cy.screenshot(`v5-esc4-Abrir-configuracion-del-post`);
    
        // Asignar los tags al post
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });
    
        // Tomar un screenshot después de asignar los tags al post
        cy.screenshot(`v5-esc4-Asignar-tags-al-post`);
    
        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();
    
        // Actualizar el post
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();
    
        // Tomar un screenshot después de hacer clic en "Update"
        cy.screenshot(`v5-esc4-Clic-en-Update`);
    
        // Verificar el tag en el post visitando la página
        cy.visit('http://localhost:2368/tag/tagtest1/');
    
        // Tomar un screenshot después de verificar el tag en la página de tags
        cy.screenshot(`v5-esc4-Verificar-tag-en-pagina-de-tags`);
    });
    
    it('Escenario 5: Eliminar tag y Verificar en Post', () => {
        // Navegar a la sección de tags
        cy.get('a[data-test-nav="tags"]').click();
        cy.url().should('include', '/tags');
    
        cy.wait(1000);
    
        // Seleccionar el tag "tagtest1" para eliminar
        cy.visit('http://localhost:2368/ghost/#/tags/tagtest1');
    
        // Tomar un screenshot después de seleccionar el tag para eliminar
        cy.screenshot(`v5-esc5-Seleccionar-el-tag-para-eliminar`);
    
        // Eliminar el tag
        cy.get('span').contains('Delete tag').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click();
    
        // Tomar un screenshot después de eliminar el tag
        cy.screenshot(`v5-esc5-Eliminar-tag`);
    
        // Verificar que el tag "tagtest1" ha sido eliminado visitando la página del post
        cy.visit('http://localhost:2368/test-1/');
    
        // Tomar un screenshot después de visitar la página del post para verificar la eliminación del tag
        cy.screenshot(`v5-esc5-Verificar-eliminacion-de-tag-en-post`);
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
            cy.visit('http://localhost:2368/ghost/');
            cy.get('a[href="#/posts/"]').click({ multiple: true, force: true });
    
            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/posts');
    
            // Seleccionar el post a editar
            cy.contains('Test multiple edits').should('be.visible').first().click();
    
            // Tomar un screenshot después de seleccionar el post para editar
            cy.screenshot(`v5-esc6-Seleccionar-el-post-para-editar-${i}`);
    
            // Esperar a que la página del editor se cargue
            cy.url().should('include', '/editor/post');
    
            // Borrar el contenido actual y escribir el nuevo contenido
            cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(`Contenido modificado ${i}`);
    
            // Actualizar el post
            cy.get('span').contains('Update').click();
    
            // Tomar un screenshot después de actualizar el post
            cy.screenshot(`v5-esc6-Actualizar-el-post-${i}`);
    
            // Esperar a que se complete la actualización
            cy.url().should('include', '/editor/post');
    
            // Navegar a la vista del post
            cy.get('a').contains('Published').click();
    
            // Tomar un screenshot después de navegar a la vista del post
            cy.screenshot(`v5-esc6-Navegar-a-la-vista-del-post-${i}`);
    
            // Navegar directamente a la URL del post actualizado
            cy.visit('http://localhost:2368/test-multiple-edits/');
    
            // Verificar el contenido modificado
            cy.contains(`Contenido modificado ${i}`).should('exist');
        }
    });    

    it('Escenario 7: Crear un Post y luego Agregarle Elementos Multimedia', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v5-esc7-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v5-esc7-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type('Test multimedia');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test multimedia');
    
        // Tomar un screenshot después de llenar el título y contenido del post
        cy.screenshot(`v5-esc7-Llenar-titulo-y-contenido`);
    
        // Publicar el post
        cy.get('span').contains('Publish').click();
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc7-Clic-en-Publish`);
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();
    
        // Tomar un screenshot después de hacer clic en "Continue, final review"
        cy.screenshot(`v5-esc7-Clic-en-Continue-final-review`);
    
        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        // Tomar un screenshot después de hacer clic en "Publish post, right now"
        cy.screenshot(`v5-esc7-Clic-en-Publish-post-right-now`);
    
        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();
    
        // Tomar un screenshot después de navegar al post publicado
        cy.screenshot(`v5-esc7-Navegar-al-post-publicado`);
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2368/test-multimedia/');
    
        // Tomar un screenshot después de visitar la URL del post actualizado
        cy.screenshot(`v5-esc7-Visitar-URL-del-post-actualizado`);
    
        // Verificar el contenido y el título del post
        cy.contains('contenido test multimedia').should('exist');
        cy.contains('Test multimedia').should('exist');
    
        // Navegar a la sección de posts
        cy.visit('http://localhost:2368/ghost/');
    
        // Navegar a la sección de posts
        cy.get('a[data-test-nav="posts"]').click();
        cy.url().should('include', '/posts');
    
        // Seleccionar el post "Test multimedia" para editar
        cy.contains('Test multimedia').should('be.visible').first().click();
    
        // Hacer clic en el botón para insertar una imagen de Unsplash
        cy.get('button.gh-editor-feature-image-unsplash').click({ force: true });
    
        // Tomar un screenshot después de hacer clic en el botón para insertar una imagen de Unsplash
        cy.screenshot(`v5-esc7-Clic-en-Insertar-imagen-de-Unsplash`);
    
        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el primer botón de Unsplash que dice "Insert image" esté visible y luego hacer clic, forzando el clic
        cy.get('a.gh-unsplash-button').contains('Insert image').first().click({ force: true });
    
        // Tomar un screenshot después de hacer clic en "Insert image"
        cy.screenshot(`v5-esc7-Clic-en-Insertar-imagen`);
    
        // Un wait 
        cy.wait(1000);
    
        // Esperar a que el botón de Update esté disponible y hacer clic
        cy.get('span').contains('Update').should('be.visible').click();
    
        // Tomar un screenshot después de hacer clic en "Update"
        cy.screenshot(`v5-esc7-Clic-en-Update`);
    
        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/post');
    
        // Navegar a la vista del post
        cy.get('a').contains('Published').click();
    
        // Tomar un screenshot después de navegar a la vista del post
        cy.screenshot(`v5-esc7-Navegar-a-la-vista-del-post`);
    });    

    it('Escenario 8: Crear una Serie de Posts Relacionados con Tags Comunes', () => {
        const posts = ['post1', 'post2', 'post3'];
        const tags = ['tagEscenario8'];
        //Crear varios posts con el mismo tag
        posts.forEach(post => {
            // Ir a la página de posts
            cy.visit('http://localhost:2368/ghost/#/posts');
            cy.screenshot(`v5-esc8-Visitar-pagina-de-posts`);

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/posts');

            // Crear un nuevo post
            cy.get('span').contains('New post').click();
            cy.screenshot(`v5-esc8-Clic-en-New-post`);

            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/editor/post');

            // Llenar el título y el contenido del post
            cy.get('textarea[placeholder="Post title"]').type(post);
            cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido '+post);

            // Asignar tags al post
            // Abrir la configuración del post
            cy.get('button.settings-menu-toggle').click();
            cy.screenshot(`v5-esc8-Abrir-configuracion-del-post`);

            // Asignar los tags al post
            tags.forEach(tag => {
                cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true});
                cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
            });

            // Hacer clic en el botón de configuración del post antes de verificar el tag
            cy.get('span.settings-menu-open').click();

            // Publicar el post
            cy.get('span').contains('Publish').click();
            cy.screenshot(`v5-esc8-Publicar-post`);

            // Esperar a que aparezca el botón de confirmación
            cy.get('span').contains('Continue, final review').click();

            // Confirmar la publicación
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();

            // Navegar al post publicado
            cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();
            cy.screenshot(`v5-esc8-Navegar-al-post-publicado`);

            // Verificar el contenido y el título del post
            cy.contains('contenido '+post).should('exist');
            cy.contains(post).should('exist');

            // Verificar el tag en el post visitando la página
            tags.forEach(tag => {
                cy.visit('http://localhost:2368/tag/'+tag+'/');
                cy.screenshot(`v5-esc8-Verificar-tag-${tag}`);
                cy.contains(post).should('exist');
            });
        });
    });    
    
    it('Escenario 9: Modificar un Post para Cambiar su Enfoque y Actualizar Tags y Multimedia', () => {
    // Crear tags
    const tags = ['nuevoEnfoqueTag1', 'nuevoEnfoqueTag2', 'nuevoEnfoqueTag3'];
    tags.forEach((tag, index) => {
        cy.get('a[data-test-nav="tags"]').click();
        cy.screenshot(`v5-esc9-ClickTags-${index}`);
        cy.url().should('include', '/tags');
        cy.get('span').contains('New tag').click();
        cy.screenshot(`v5-esc9-ClickNewTag-${index}`);
        cy.get('input[id="tag-name"]').type(tag);
        cy.get('span[data-test-task-button-state="idle"]').contains('Save').click();
        cy.screenshot(`v5-esc9-CreateTag-${tag}`);
        cy.get('a[data-test-nav="tags"]').click();
    });

    // Navegar a la sección de posts
    cy.get('a[href="#/posts/"]').click({ multiple: true });
    cy.screenshot('v5-esc9-NavigatePosts');
    cy.url().should('include', '/posts');

    // Seleccionar la Página "Test multimedia" para editar
    cy.contains('Test multimedia').should('be.visible').first().click();
    cy.screenshot('v5-esc9-SelectPost');

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
        // Título y contenido del post
        const title = 'New preview post';
        const content = 'Contenido de new preview post';
    
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v5-esc10-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v5-esc10-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content);
    
        // Tomar un screenshot después de llenar el título y contenido del post
        cy.screenshot(`v5-esc10-Llenar-titulo-y-contenido`);
    
        // Ver vista previa
        cy.get('span').contains('Preview').click();
    
        // Esperar a que se muestre la vista previa
        cy.get('div.gh-browserpreview-iframecontainer').should('be.visible');
    
        // Regresar al editor desde la vista previa
        cy.get('span').contains('Preview').click({ force: true });
    
        // Publicar el post
        cy.get('span').contains('Publish').click({ force: true });
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc10-Clic-en-Publish`);
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();
    
        // Tomar un screenshot después de hacer clic en "Continue, final review"
        cy.screenshot(`v5-esc10-Clic-en-Continue-final-review`);
    
        // Confirmar la publicación
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
    
        // Navegar al post publicado
        cy.get('img[src="https://static.ghost.org/v5.0.0/images/publication-cover.jpg"]').click();
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:2368/test-1/');
    
        // Verificar el contenido y el título del post
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
    });    

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {
        // Título y contenido del post
        const title = 'New programmed post';
        const content = 'Contenido de new programmed post';
        const date = '2023-esc11-11';
        const time = '11:11';
    
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click();
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v5-esc11-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v5-esc11-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content);
    
        // Tomar un screenshot después de llenar el título y contenido del post
        cy.screenshot(`v5-esc11-Llenar-titulo-y-contenido`);
    
        // Abrir la configuración del post
        cy.get('button.settings-menu-toggle').click();
    
        // Configurar la fecha y hora de publicación
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', date);
        cy.get('input[data-test-date-time-picker-time-input=""]').invoke('val', time);
    
        // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('span.settings-menu-open').click();
    
        // Publicar el post
        cy.get('span').contains('Publish').click();
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc11-Clic-en-Publish`);
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('span').contains('Continue, final review').click();
    
        // Tomar un screenshot después de hacer clic en "Continue, final review"
        cy.screenshot(`v5-esc11-Clic-en-Continue-final-review`);
    
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
    
        // Tomar un screenshot después de navegar a la sección de páginas
        cy.screenshot(`v5-esc12-Navegar-a-la-seccion-de-paginas`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/pages');
    
        // Crear una nueva página
        cy.get('span').contains('New page').click();
    
        // Tomar un screenshot después de hacer clic en "New page"
        cy.screenshot(`v5-esc12-Clic-en-New-page`);
    
        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');
    
        // Llenar el título y el contenido de la página
        cy.get('textarea[placeholder="Page title"]').type('Contacto test');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test');
    
        // Tomar un screenshot después de llenar el título y contenido de la página
        cy.screenshot(`v5-esc12-Llenar-titulo-y-contenido`);
    
        // Publicar la página
        cy.get('span').contains('Publish').click();
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc12-Clic-en-Publish`);
    
        // Confirmar la publicación
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
    
        // Visitar la página publicada
        cy.visit('http://localhost:2368/contacto-test/');
    
        // Tomar un screenshot después de visitar la página publicada
        cy.screenshot(`v5-esc12-Visitar-pagina-publicada`);
    
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
    
        // Tomar un screenshot después de hacer clic en "New page"
        cy.screenshot(`v5-esc13-Clic-en-New-page`);
    
        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');
    
        // Llenar el título y el contenido de la página
        cy.get('textarea[placeholder="Page title"]').type('Pagina test 2');
        cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido test 2');
    
        // Tomar un screenshot después de llenar el título y contenido de la página
        cy.screenshot(`v5-esc13-Llenar-titulo-y-contenido`);
    
        // Asignar tags a la página
        // Abrir la configuración de la página
        cy.get('button.settings-menu-toggle').click();
    
        // Asignar los tags a la página
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });
    
        // Tomar un screenshot después de asignar los tags a la página
        cy.screenshot(`v5-esc13-Asignar-tags-a-la-pagina`);
    
        // Hacer clic en el botón de configuración de la página antes de verificar el tag
        cy.get('span.settings-menu-open').click();
    
        // Publicar la página
        cy.get('span').contains('Publish').click();
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v5-esc13-Clic-en-Publish`);
    
        // Confirmar la publicación
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
    
        // Visitar la página publicada
        cy.visit('http://localhost:2368/pagina-test-2/');
    
        // Tomar un screenshot después de visitar la página publicada
        cy.screenshot(`v5-esc13-Visitar-pagina-publicada`);
    
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
        });
    
        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click();
        cy.url().should('include', '/pages');
    
        // Seleccionar la Página "Contacto test" para editar
        cy.contains('Contacto test').should('be.visible').first().click();
    
        // Tomar un screenshot después de seleccionar la página para editar
        cy.screenshot(`v5-esc14-Seleccionar-la-pagina-para-editar`);
    
        // Abrir la configuración de la página
        cy.get('button.settings-menu-toggle').click();
    
        // Tomar un screenshot después de abrir la configuración de la página
        cy.screenshot(`v5-esc14-Abrir-configuracion-de-la-pagina`);
    
        // Asignar los tags a la página
        tags.forEach(tag => {
            cy.get('span.ember-power-select-status-icon').click({ multiple: true, force: true });
            cy.get('div#tag-input ul.ember-power-select-multiple-options input.ember-power-select-trigger-multiple-input').first().type(`${tag}{enter}`);
        });
    
        // Tomar un screenshot después de asignar los tags a la página
        cy.screenshot(`v5-esc14-Asignar-tags-a-la-pagina`);
    
        // Hacer clic en el botón de configuración de la página antes de verificar el tag
        cy.get('span.settings-menu-open').click();
    
        // Actualizar la página
        cy.get('span[data-test-task-button-state="idle"]').contains('Update').click();
    
        // Tomar un screenshot después de hacer clic en "Update"
        cy.screenshot(`v5-esc14-Clic-en-Update`);
    
        // Verificar que se haya asignado el tag
        cy.contains('Updated').should('exist');
    });    

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const pages = ['page1', 'page2', 'page3'];
    
        pages.forEach((page, index) => {
            // Navegar a la sección de páginas
            cy.visit('http://localhost:2368/ghost/#/pages');
            cy.screenshot(`v5-esc15-${index+1}-navegarSeccionPaginas`);
    
            // Crear una nueva página
            cy.get('span').contains('New page').click({force: true});
            cy.screenshot(`v5-esc15-${index+1}-crearNuevaPagina`);
    
            // Llenar el título y el contenido de la página
            cy.get('textarea[placeholder="Page title"]').type(page, { force: true });
            cy.get('p[data-koenig-dnd-droppable="true"]').first().type('contenido '+page, { force: true });
            cy.screenshot(`v5-esc15-${index+1}-llenarTituloContenido`);
    
            // Publicar la página
            cy.get('span').contains('Publish').click({ force: true });
            cy.screenshot(`v5-esc15-${index+1}-publicarPagina`);
    
            // Confirmar la publicación
            cy.get('span').contains('Continue, final review').click();
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
            cy.screenshot(`v5-esc15-${index+1}-confirmarPublicacion`);
    
            // Verificar el título y el contenido de la página
            cy.contains(page).should('exist');
            cy.contains('contenido '+page).should('exist');
            cy.screenshot(`v5-esc15-${index+1}-verificarTituloContenido`);
        });
    });    

    it('Escenario 16: Modificar una Página Estática', () => {
        const newContent = 'Contenido modificado' + Math.floor(Math.random() * 1000);
    
        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click({ force: true });
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/pages');
    
        // Seleccionar el post a editar
        cy.contains('page1').should('be.visible').first().click({ force: true });
    
        // Tomar un screenshot después de seleccionar la página para editar
        cy.screenshot(`v5-esc16-Seleccionar-la-pagina-para-editar`);
    
        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/page');
    
        // Borrar el contenido actual y escribir el nuevo contenido
        cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newContent);
    
        // Tomar un screenshot después de editar el contenido
        cy.screenshot(`v5-esc16-Editar-contenido`);
    
        // Actualizar el post
        cy.get('span').contains('Update').click({ force: true });
    
        // Esperar a que se complete la actualización
        cy.url().should('include', '/editor/page');
    
        // Navegar a la vista del post
        cy.get('a').contains('Published').click({ force: true });
    
        // Tomar un screenshot después de navegar a la vista del post actualizado
        cy.screenshot(`v5-esc16-Navegar-a-la-vista-del-post-actualizado`);
    
        // Verificar el contenido modificado
        cy.contains(newContent).should('exist');
    });    

    it('Escenario 17: Eliminar tag y Verificar en Página', () => {
        // Navegar a la sección de tags
        cy.get('a[data-test-nav="tags"]').click({ force: true });
        cy.url().should('include', '/tags');
    
        // Seleccionar el tag "tagtest1" para eliminar
        cy.visit('http://localhost:2368/ghost/#/tags/tagtest6');
    
        // Tomar un screenshot después de seleccionar el tag para eliminar
        cy.screenshot(`v5-esc17-Seleccionar-tag-para-eliminar`);
    
        // Eliminar el tag
        cy.get('span').contains('Delete tag').click({ force: true });
        cy.get('span[data-test-task-button-state="idle"]').contains('Delete').click({ force: true });
    
        // Tomar un screenshot después de eliminar el tag
        cy.screenshot(`v5-esc17-Eliminar-tag`);
    
        // Navegar a la sección de páginas
        cy.get('a[data-test-nav="pages"]').click({ force: true });
        cy.url().should('include', '/pages');
    
        // Seleccionar la Página "Contacto test" para editar
        cy.contains('Contacto test').first().click({ force: true });
    
        // Tomar un screenshot después de seleccionar la página para editar
        cy.screenshot(`v5-esc17-Seleccionar-pagina-para-editar`);
    
        // Abrir la configuración de la página
        cy.get('button.settings-menu-toggle').click({ force: true });
    
        // Tomar un screenshot después de abrir la configuración de la página
        cy.screenshot(`v5-esc17-Abrir-configuracion-de-la-pagina`);
    
        // El tag eliminado "tagtest6" no debe existir
        cy.contains('tagtest6').should('not.exist');
    });    

    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const nombre = 'Juan';
        const email = 'juan'+Math.floor(Math.random() * 1000)+'@gmail.com';
    
        // Navegar a la sección de miembros
        cy.get('a[href="#/members/"]').click();
        cy.screenshot('v5-esc18-navegarSeccionMiembros');
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/members');
    
        cy.get("body").then($body => {
            if ($body.find("Add them manually").length > 0) {   
                cy.get('a').contains('Add them manually').click();
                cy.screenshot('v5-esc18-agregarManualmente');
            }
            else{
                cy.get('span').contains('New member').click();
                cy.screenshot('v5-esc18-nuevoMiembro');
            }
        });
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/members/new');
    
        // Llenar el nombre y el email del miembro
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.screenshot('v5-esc18-llenarNombreEmail');
    
        // Guardar la información del miembro
        cy.get('span').contains('Save').click();
        cy.screenshot('v5-esc18-guardarMiembro');
    
        // Esperar a que aparezca la confirmación de guardado
        cy.get('span').contains('Saved').should('exist');
        cy.screenshot('v5-esc18-confirmacionGuardado');
    
        // Verificar el nombre y email del miembro
        cy.contains(nombre).should('exist');
        cy.contains(email).should('exist');
        cy.screenshot('v5-esc18-verificarInformacionMiembro');
    });    

    it('Escenario 19: Editar la Información de un Miembro y Cambiar el Estado de la Suscripción a la Newsletter', () => {
        const nombre = 'Juan';
    
        // Navegar a la sección de miembros
        cy.get('a[href="#/members/"]').click();
        cy.screenshot('v5-esc19-navegarSeccionMiembros');
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/members');
        cy.wait(1000); // Espera explícita
    
        // Seleccionar el miembro
        cy.contains(nombre).should('be.visible').first().click();
        cy.screenshot('v5-esc19-seleccionarMiembro');
    
        // Obtener el estado del checkbox
        let isChecked = false;
        cy.get('input[data-test-checkbox="member-subscribed"]').then(($input) => {
            isChecked = $input.prop('checked');
            cy.screenshot('v5-esc19-estadoCheckboxInicial');
        });
    
        // Cambiar el estado del checkbox
        cy.get('span.input-toggle-component').click();
        cy.screenshot('v5-esc19-cambiarEstadoCheckbox');
    
        // El estado del checkbox debe haber cambiado
        cy.get('input[data-test-checkbox="member-subscribed"]').then(($input) => {
            const tempIsChecked = $input.prop('checked');
            cy.screenshot('v5-esc19-estadoCheckboxModificado');
            if (isChecked) {
                expect(tempIsChecked).to.be.false;
            }
            else {
                expect(tempIsChecked).to.be.true;
            }
        });
    
        // Guardar la información del miembro
        cy.get('span').contains('Save').click();
        cy.screenshot('v5-esc19-guardarCambios');
    
        // Esperar confirmación de guardado
        cy.get('span').contains('Saved').should('exist');
        cy.screenshot('v5-esc19-confirmacionGuardado');
    
        // Verificar el nombre del miembro
        cy.contains(nombre).should('exist');
        cy.screenshot('v5-esc19-verificarInformacionMiembro');
    });    

    it('Escenario 20: Agregar Varios Miembros y Exportar su Lista', () => {
        const nombres = ['Juan', 'Natalia', 'Sofia'];
        // Iterar sobre el array de nombres
        nombres.forEach(nombreRaw => {
            const random = Math.floor(Math.random() * 1000000);
            const nombre = nombreRaw + random;
            const email = nombreRaw + random + '@gmail.com';
    
            // Navegar a la sección de miembros
            cy.visit('http://localhost:2368/ghost/#/members');
    
            // Tomar un screenshot después de navegar a la sección de miembros
            cy.screenshot(`v5-esc20-Navegar-a-la-seccion-de-miembros-${nombre}`);
    
            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/members');
    
            cy.get("body").then($body => {
                if ($body.find("Add them manually").length > 0) {
                    // Evalúa como verdadero
                    cy.get('a').contains('Add them manually').click({ force: true });
                }
                else {
                    cy.get('span').contains('New member').click({ force: true });
                }
            });
    
            // Tomar un screenshot después de hacer clic en "Add them manually" o "New member"
            cy.screenshot(`v5-esc20-Clic-en-Add-them-manually-o-New-member-${nombre}`);
    
            // Esperar a que la nueva página se cargue
            cy.url().should('include', '/members/new');
    
            // Llenar el título y el contenido del post
            cy.get('input[data-test-input="member-name"]').type(nombre);
            cy.get('input[data-test-input="member-email"]').type(email);
    
            // Tomar un screenshot después de ingresar nombre y correo
            cy.screenshot(`v5-esc20-Ingresar-nombre-y-correo-${nombre}`);
    
            // Publicar el post
            cy.get('span').contains('Save').click({ force: true });
    
            // Esperar confirmación de guardado
            cy.get('span').contains('Saved').should('exist');
    
            // Tomar un screenshot después de guardar
            cy.screenshot(`v5-esc20-Guardar-miembro-${nombre}`);
    
            // Verificar el contenido y el título del post
            cy.contains(nombre).should('exist');
            cy.contains(email).should('exist');
        });
    
        // Navegar a la sección de miembros
        cy.visit('http://localhost:2368/ghost/#/members');
    
        // Tomar un screenshot después de navegar a la sección de miembros
        cy.screenshot(`v5-esc20-Navegar-a-la-seccion-de-miembros-exportar`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/members');
    
        // Ver acciones sobre la lista de miembros
        cy.get('button[data-test-button="members-actions"]').click({ force: true });
    
        // Exportar lista con todos los miembros
        cy.get('span').contains('Export all members').click({ force: true });
    });
    
});