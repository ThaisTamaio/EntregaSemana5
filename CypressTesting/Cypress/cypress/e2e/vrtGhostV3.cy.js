describe('Ghost tests version 3.42', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/ghost/');
        cy.get('input[name="identification"]', { timeout: 10000 }).type('pruebas@gmail.com');
        cy.get('input[name="password"]', { timeout: 10000 }).type('pruebas1234');
        cy.contains('span', 'Sign in', { timeout: 10000 }).click();
        cy.wait(1000);
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Se detectó una excepción no capturada:', err);
            return false;
        });
    });    

    it('Escenario 1: Creación y publicación de un post', () => {
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.screenshot(`v3-esc1-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.screenshot(`v3-esc1-Clic-en-New-post`);
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post Title"]').type('Test 1');
        cy.get('div.koenig-editor__editor').type('Contenido test 1');
        cy.screenshot(`v3-esc1-Llenar-titulo-y-contenido`);
        cy.get('span').contains('Publish').click({ force: true });
        cy.screenshot(`v3-esc1-Clic-en-Publish`);
        cy.get('span').contains('Publish').click();
        cy.visit('http://localhost:3001/ghost/#/posts');
        cy.screenshot(`v3-esc1-Navegar-al-post-publicado`);
        cy.contains('Test 1').should('be.visible');
    });

    it('Escenario 2: Modificar un post existente', () => {
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.screenshot(`v3-esc2-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.contains('Test 1').first().click();
        cy.screenshot(`v3-esc2-Seleccionar-el-post-a-editar`);
        cy.url().should('include', '/editor/post');
        cy.get('div.koenig-editor__editor').clear({ force: true }).type('Contenido modificado');
        cy.screenshot(`v3-esc2-Modificar-el-contenido`);
        cy.get('span').contains('Update').click({ force: true });
        cy.screenshot(`v3-esc2-Clic-en-Update`);
        cy.get('span').contains('Update').click();
        cy.screenshot(`v3-esc2-Navegar-a-la-vista-del-post`);
        cy.get('a[href="#/posts/"]').click({ force: true, multiple: true });
        cy.contains('Test 1').first().click();
        cy.contains('Contenido modificado').should('exist');
    });
    
    it('Escenario 6: Crear un Post, Publicarlo y Luego Editarlo Múltiples Veces', () => {
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post Title"]').type('Test modificado');
        cy.get('div.koenig-editor__editor').type('Contenido test modificado');
        cy.get('span').contains('Publish').click({ force: true });
        cy.get('span').contains('Publish').click();
        cy.visit('http://localhost:3001/ghost/#/posts');

        for (let i = 1; i <= 5; i++) {
            cy.contains('Test modificado').first().click();
            cy.screenshot(`v3-esc6-Seleccionar-el-post-para-editar-${i}`);
            cy.url().should('include', '/editor/post');
            cy.get('div.koenig-editor__editor').clear({ force: true }).type(`Contenido modificado ${i}`);
            cy.get('span').contains('Update').click({ force: true });
            cy.screenshot(`v3-esc6-Actualizar-el-post-${i}`);
            cy.get('span').contains('Update').click();
            cy.screenshot(`v3-esc6-Navegar-a-la-vista-del-post-${i}`);
            cy.get('a[href="#/posts/"]').click({ force: true, multiple: true });
        }
    });

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {
        const title = 'New programmed post';
        const content = 'Contenido de new programmed post';
        const date = '2023-11-11';
        const time = '11:11';
    
        cy.get('a[href="#/posts/"]').click({ multiple: true });
        cy.screenshot(`v3-esc11-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.screenshot(`v3-esc11-Clic-en-New-post`);
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post Title"]').type(title);
        cy.get('div.koenig-editor__editor').type(content);
        cy.screenshot(`v3-esc11-Llenar-titulo-y-contenido`);
        cy.get('button[class="post-settings"]').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', date);
        cy.get('div.gh-date-time-picker-time').invoke('val', time);
        cy.get('button[class="close settings-menu-header-action"]').click();
        cy.get('span').contains('Publish').click({ force: true });
        cy.screenshot(`v3-esc11-Clic-en-Publish`);
        cy.get('div').contains('Schedule it for later').click();
        cy.get('span').contains('Schedule').click();
        cy.screenshot(`v3-esc11-Clic-en-Continue-final-review`);
        cy.visit('http://localhost:3001/ghost/#/posts');
        cy.contains(title).should('exist');
    });

    it('Escenario 15: Crear Varias Páginas Estáticas', () => {
        const pages = ['page1', 'page2', 'page3'];
    
        pages.forEach((page, index) => {
            cy.visit('http://localhost:3001/ghost/#/pages');
            cy.screenshot(`v3-esc15-${index+1}-navegarSeccionPaginas`);
            cy.get('span').contains('New page').click({force: true});
            cy.screenshot(`v3-esc15-${index+1}-crearNuevaPagina`);
            cy.get('textarea[placeholder="Page Title"]').type(page, { force: true });
            cy.get('div.koenig-editor__editor').type('contenido '+page, { force: true });
            cy.screenshot(`v3-esc15-${index+1}-llenarTituloContenido`);
            cy.get('span').contains('Publish').click({ force: true });
            cy.screenshot(`v3-esc15-${index+1}-publicarPagina`);
            cy.get('span').contains('Publish').click();
            cy.screenshot(`v3-esc15-${index+1}-confirmarPublicacion`);
            cy.contains(page).should('exist');
            cy.contains('contenido '+page).should('exist');
            cy.screenshot(`v3-esc15-${index+1}-verificarTituloContenido`);
        });
    });   
    
    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const email = 'juan'+Math.floor(Math.random() * 1000)+'@gmail.com';
        cy.get('a[href="#/staff/"]').first().click();
        cy.screenshot('v3-esc18-navegarSeccionMiembros');
        cy.url().should('include', '/staff');
        cy.get('span').contains('Invite people').click();
        cy.screenshot('v3-esc18-nuevoMiembro');
        cy.get('input[id="new-user-email"]').type(email);
        cy.screenshot('v3-esc18-llenarNombreEmail');
        cy.get('span').contains('Send invitation now').click();
        cy.screenshot('v3-esc18-guardarMiembro');
        cy.reload();
        cy.screenshot('v3-esc18-confirmacionGuardado');
        cy.contains(email).should('exist');
        cy.screenshot('v3-esc18-verificarInformacionMiembro');
    });
});