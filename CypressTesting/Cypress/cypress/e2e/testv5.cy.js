describe('Ghost tests version 5.42', () => {
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
});