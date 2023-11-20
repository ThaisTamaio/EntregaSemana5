describe('Ghost tests version 3.42', () => {
    beforeEach(() => {
        // Visita la URL
        cy.visit('http://localhost:3001/ghost/');
    
        // Espera y escribe en el campo de identificación
        cy.get('input[name="identification"]', { timeout: 10000 }).type('pruebas@gmail.com');
    
        // Espera y escribe en el campo de contraseña
        cy.get('input[name="password"]', { timeout: 10000 }).type('pruebas1234');
    
        // Espera y hace clic en el botón de iniciar sesión
        cy.contains('span', 'Sign in', { timeout: 10000 }).click();

        cy.wait(1000);
    
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
        cy.get('a[href="#/posts/"]').click({ multiple: true });
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v3-esc1-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v3-esc1-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post Title"]').type('Test 1');
        cy.get('div.koenig-editor__editor').type('Contenido test 1');
    
        // Tomar un screenshot después de llenar el título y contenido
        cy.screenshot(`v3-esc1-Llenar-titulo-y-contenido`);
    
        // Oprimir el botón "Publish" una vez este haya aparecido
        cy.get('span').contains('Publish').click({ force: true });
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v3-esc1-Clic-en-Publish`);
    
        // Oprimir el botón "Publish" en el cuadro de diálogo de confirmación
        cy.get('span').contains('Publish').click();
    
        // Visitar la sección de posts para verificar la creación del post
        cy.visit('http://localhost:3001/ghost/#/posts');
    
        // Tomar un screenshot después de navegar al post publicado
        cy.screenshot(`v3-esc1-Navegar-al-post-publicado`);
    
        // Verificar que el post "Test 1" aparezca en la lista
        cy.contains('Test 1').should('be.visible');
    
    });
    

    it('Escenario 2: Modificar un post existente', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click({ multiple: true });
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v3-esc2-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Seleccionar el post a editar
        cy.contains('Test 1').first().click();
    
        // Tomar un screenshot después de seleccionar el post a editar
        cy.screenshot(`v3-esc2-Seleccionar-el-post-a-editar`);
    
        // Esperar a que la página del editor se cargue
        cy.url().should('include', '/editor/post');
    
        // Borrar el contenido actual y escribir el nuevo contenido
        cy.get('div.koenig-editor__editor').clear({ force: true }).type('Contenido modificado');
    
        // Tomar un screenshot después de modificar el contenido
        cy.screenshot(`v3-esc2-Modificar-el-contenido`);
    
        // Actualizar el post
        cy.get('span').contains('Update').click({ force: true });
    
        // Tomar un screenshot después de hacer clic en "Update"
        cy.screenshot(`v3-esc2-Clic-en-Update`);

        // Oprimir el botón "Publish" en el cuadro de diálogo de confirmación
        cy.get('span').contains('Update').click();
    
        // Tomar un screenshot después de navegar a la vista del post
        cy.screenshot(`v3-esc2-Navegar-a-la-vista-del-post`);

        // Hacer clic en el botón para regresar a la sección de posts
        cy.get('a[href="#/posts/"]').click({ force: true, multiple: true });

        // Seleccionar el post "Test modificado" a editar
        cy.contains('Test 1').first().click();
    
        // Verificar el contenido modificado
        cy.contains('Contenido modificado').should('exist');
    });
    
    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples Veces', () => {
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click({ multiple: true });
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post Title"]').type('Test modificado');
        cy.get('div.koenig-editor__editor').type('Contenido test modificado');
    
        // Oprimir el botón "Publish" una vez este haya aparecido
        cy.get('span').contains('Publish').click({ force: true });
    
        // Oprimir el botón "Publish" en el cuadro de diálogo de confirmación
        cy.get('span').contains('Publish').click();
    
        // Visitar la sección de posts para verificar la creación del post
        cy.visit('http://localhost:3001/ghost/#/posts');

        for (let i = 1; i <= 5; i++) {
            // Seleccionar el post "Test modificado" a editar
            cy.contains('Test modificado').first().click();

            // Tomar un screenshot después de seleccionar el post para editar
            cy.screenshot(`v3-esc6-Seleccionar-el-post-para-editar-${i}`);
    
            // Esperar a que la página del editor se cargue
            cy.url().should('include', '/editor/post');
    
            // Borrar el contenido actual y escribir el nuevo contenido
            cy.get('div.koenig-editor__editor').clear({ force: true }).type(`Contenido modificado ${i}`);
    
            // Actualizar el post
            cy.get('span').contains('Update').click({ force: true });

            // Tomar un screenshot después de actualizar el post
            cy.screenshot(`v3-esc6-Actualizar-el-post-${i}`);
    
            // Oprimir el botón "Update" en el cuadro de diálogo de confirmación
            cy.get('span').contains('Update').click();
    
            // Tomar un screenshot después de navegar a la vista del post
            cy.screenshot(`v3-esc6-Navegar-a-la-vista-del-post-${i}`);
    
            // Hacer clic en el botón para regresar a la sección de posts
            cy.get('a[href="#/posts/"]').click({ force: true, multiple: true });
        }
    });

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {
        // Título y contenido del post
        const title = 'New programmed post';
        const content = 'Contenido de new programmed post';
        const date = '2023-11-11';
        const time = '11:11';
    
        // Navegar a la sección de posts
        cy.get('a[href="#/posts/"]').click({ multiple: true });
    
        // Tomar un screenshot después de navegar a la sección de posts
        cy.screenshot(`v3-esc11-Navegar-a-la-seccion-de-posts`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/posts');
    
        // Crear un nuevo post
        cy.get('span').contains('New post').click();
    
        // Tomar un screenshot después de hacer clic en "New post"
        cy.screenshot(`v3-esc11-Clic-en-New-post`);
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/editor/post');
    
        // Llenar el título y el contenido del post
        cy.get('textarea[placeholder="Post Title"]').type(title);
        cy.get('div.koenig-editor__editor').type(content);
    
        // Tomar un screenshot después de llenar el título y contenido
        cy.screenshot(`v3-esc11-Llenar-titulo-y-contenido`);
    
        // Abrir la configuración del post
        cy.get('button[class="post-settings"]').click();
    
        // Configurar la fecha y hora de publicación
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', date);
        cy.get('div.gh-date-time-picker-time').invoke('val', time);
    
        // // Hacer clic en el botón de configuración del post antes de verificar el tag
        cy.get('button[class="close settings-menu-header-action"]').click();
    
        // Publicar el post
        cy.get('span').contains('Publish').click({ force: true });
    
        // Tomar un screenshot después de hacer clic en "Publish"
        cy.screenshot(`v3-esc11-Clic-en-Publish`);
    
        // Esperar a que aparezca el botón de confirmación
        cy.get('div').contains('Schedule it for later').click();
        cy.get('span').contains('Schedule').click();
    
        // Tomar un screenshot después de hacer clic en "Continue, final review"
        cy.screenshot(`v3-esc11-Clic-en-Continue-final-review`);
    
        // Confirmar la publicación
        cy.visit('http://localhost:3001/ghost/#/posts');
    
        // Verificar el contenido y el título del post
        cy.contains(title).should('exist');
    });

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const pages = ['page1', 'page2', 'page3'];
    
        pages.forEach((page, index) => {
            // Navegar a la sección de páginas
            cy.visit('http://localhost:3001/ghost/#/pages');
            cy.screenshot(`v3-esc15-${index+1}-navegarSeccionPaginas`);
    
            // Crear una nueva página
            cy.get('span').contains('New page').click({force: true});
            cy.screenshot(`v3-esc15-${index+1}-crearNuevaPagina`);
    
            // Llenar el título y el contenido de la página
            cy.get('textarea[placeholder="Page Title"]').type(page, { force: true });
            cy.get('div.koenig-editor__editor').type('contenido '+page, { force: true });
            cy.screenshot(`v3-esc15-${index+1}-llenarTituloContenido`);
    
            // Publicar la página
            cy.get('span').contains('Publish').click({ force: true });
            cy.screenshot(`v3-esc15-${index+1}-publicarPagina`);

            // Oprimir el botón "Publish" en el cuadro de diálogo de confirmación
            cy.get('span').contains('Publish').click();
            cy.screenshot(`v3-esc15-${index+1}-confirmarPublicacion`);
    
            // Verificar el título y el contenido de la página
            cy.contains(page).should('exist');
            cy.contains('contenido '+page).should('exist');
            cy.screenshot(`v3-esc15-${index+1}-verificarTituloContenido`);
        });
    });   
    
    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const email = 'juan'+Math.floor(Math.random() * 1000)+'@gmail.com';
    
        // Navegar a la sección de miembros
        cy.get('a[href="#/staff/"]').first().click();
        cy.screenshot('v3-esc18-navegarSeccionMiembros');
    
        // Esperar a que la nueva página se cargue
        cy.url().should('include', '/staff');
    
        cy.get('span').contains('Invite people').click();
        cy.screenshot('v3-esc18-nuevoMiembro');
    
        // Llenar el nombre y el email del miembro
        cy.get('input[id="new-user-email"]').type(email);
        cy.screenshot('v3-esc18-llenarNombreEmail');
    
        // Guardar la información del miembro
        cy.get('span').contains('Send invitation now').click();
        cy.screenshot('v3-esc18-guardarMiembro');
    
        // Esperar a que aparezca la confirmación de guardado
        //reload page
        cy.reload();
        cy.screenshot('v3-esc18-confirmacionGuardado');
    
        // Verificar el nombre y email del miembro
        cy.contains(email).should('exist');
        cy.screenshot('v3-esc18-verificarInformacionMiembro');
    });
});