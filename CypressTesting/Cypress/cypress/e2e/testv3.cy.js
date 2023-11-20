describe('Ghost Post Creation and Publication', () => {
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
    
        // Navegar directamente a la URL del post actualizado
        cy.visit('http://localhost:3001/test-1/');
    
        // Tomar un screenshot después de visitar la URL del post actualizado
        cy.screenshot(`v3-esc2-Visitar-URL-del-post-actualizado`);
    
        // Verificar el contenido modificado
        cy.contains('Contenido modificado').should('exist');
    });
    
    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples Veces', () => {
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
        cy.get('textarea[placeholder="Post Title"]').type('Test modificado');
        cy.get('div.koenig-editor__editor').type('Contenido test modificado');
    
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
    
        // Verificar que el post "Test modificado" aparezca en la lista
        cy.contains('Test modificado').should('be.visible');

        for (let i = 1; i <= 3; i++) {
            // Seleccionar el post "Test modificado" a editar
            cy.contains('Test modificado').first().click();
    
            // Tomar un screenshot después de seleccionar el post a editar
            cy.screenshot(`v6-esc6-Seleccionar-el-post-a-editar-${i}`);
    
            // Esperar a que la página del editor se cargue
            cy.url().should('include', '/editor/post');
    
            // Borrar el contenido actual y escribir el nuevo contenido
            cy.get('div.koenig-editor__editor').clear({ force: true }).type(`Contenido modificado ${i}`);
    
            // Tomar un screenshot después de modificar el contenido
            cy.screenshot(`v6-esc6-Modificar-el-contenido-${i}`);
    
            // Actualizar el post
            cy.get('span').contains('Update').click({ force: true });
    
            // Tomar un screenshot después de hacer clic en "Update"
            cy.screenshot(`v6-esc6-Clic-en-Update-${i}`);
    
            // Oprimir el botón "Update" en el cuadro de diálogo de confirmación
            cy.get('span').contains('Update').click();
    
            // Tomar un screenshot después de navegar a la vista del post
            cy.screenshot(`v6-esc6-Navegar-a-la-vista-del-post-${i}`);
    
            // Hacer clic en el botón para regresar a la sección de posts
            cy.get('a[href="#/posts/"]').click({ force: true, multiple: true });
        }
    });
    
});