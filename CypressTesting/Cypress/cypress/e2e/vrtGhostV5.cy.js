describe('Ghost Post Creation and Publication', () => {
    beforeEach(() => {
        cy.visit('http://localhost:2368/ghost/');
        cy.get('input[name="identification"]').type('pruebas@gmail.com');
        cy.get('input[name="password"]').type('pruebas1234');
        cy.get('span').contains('Sign in').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Se detectó una excepción no capturada:', err);
            return false;
        });
    });

    it('Escenario 1: Creación y publicación de un post', () => {
        const postTitle = "Titulo1"
        const postContent = "Contenido1"

        cy.get('a[href="#/posts/"]').click();
        cy.screenshot(`v5-esc1-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.screenshot(`v5-esc1-Clic-en-New-post`);
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.screenshot(`v5-esc1-Llenar-titulo-y-contenido`);
        cy.get('span').contains('Publish').click();
        cy.screenshot(`v5-esc1-Clic-en-Publish`);
        cy.get('span').contains('Continue, final review').click();
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.visit(`http://localhost:2368/ghost/#/posts`);
        cy.screenshot(`v5-esc1-Navegar-al-post-publicado`);
        cy.contains(postTitle).should('exist');
    });

    it('Escenario 2: Modificar un post existente', () => {
        const postTitle = "Titulo2"
        const postContent = "Contenido2"
        const newPostContent = "NuevoContenido2"

        cy.get('a[href="#/posts/"]').click();
        cy.screenshot(`v5-esc2-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.screenshot(`v5-esc2-Seleccionar-el-post-a-editar`);
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(postContent);
        cy.screenshot(`v5-esc2-Modificar-el-contenido`);
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
        cy.screenshot(`v5-esc2-Clic-en-Update`);
        cy.url().should('include', '/editor/post');
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.screenshot(`v5-esc2-Navegar-a-la-vista-del-post`);
        cy.contains(postTitle).click();
        cy.contains(newPostContent).should('exist');
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
            cy.screenshot(`v5-esc6-Seleccionar-el-post-para-editar-${i}`);
            cy.url().should('include', '/posts');
            cy.contains(postTitle).click({ force: true });
            cy.url().should('include', '/editor/post');
            cy.get('p[data-koenig-dnd-droppable="true"]').clear().type(newPostContent);
            cy.screenshot(`v5-esc6-Actualizar-el-post-${i}`);
            cy.get('span').contains('Update').click();
            cy.screenshot(`v5-esc6-Navegar-a-la-vista-del-post-${i}`);
            cy.url().should('include', '/editor/post');
            cy.contains(newPostContent).should('exist');
        }
    });

    it('Escenario 11: Crear un Post y Programar su Publicación para una Fecha y Hora Futura', () => {

        const dateString  = "2023-12-31";
        const timeString = "14:30";
        const title = "Titulo11";
        const content = "Contenido11";

        cy.get('a[href="#/posts/"]').click();
        cy.screenshot(`v5-esc11-Navegar-a-la-seccion-de-posts`);
        cy.url().should('include', '/posts');
        cy.get('span').contains('New post').click();
        cy.screenshot(`v5-esc11-Clic-en-New-post`);
        cy.url().should('include', '/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(title);
        cy.get('p[data-koenig-dnd-droppable="true"]').type(content);
        cy.screenshot(`v5-esc11-Llenar-titulo-y-contenido`);
        cy.get('button.settings-menu-toggle').click();
        cy.get('input[placeholder="YYYY-MM-DD"]').invoke('val', dateString);
        cy.get('input[data-test-date-time-picker-time-input=""]').invoke('val', timeString);
        cy.get('span.settings-menu-open').click();
        cy.get('span').contains('Publish').click();
        cy.screenshot(`v5-esc11-Clic-en-Publish`);
        cy.get('span').contains('Continue, final review').click();
        cy.screenshot(`v5-esc11-Clic-en-Continue-final-review`);
        cy.get('span[data-test-task-button-state="idle"]').contains('Publish post, right now').click();
        cy.contains(content).should('exist');
        cy.contains(title).should('exist');
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
            cy.screenshot(`v5-esc15-${index+1}-navegarSeccionPaginas`);
            cy.wait(1000);
            cy.get('span').contains('New page').click({force: true});
            cy.screenshot(`v5-esc15-${index+1}-crearNuevaPagina`);
            cy.get('textarea[placeholder="Page title"]').type(page, { force: true });
            cy.get('p[data-koenig-dnd-droppable="true"]').type(pageContent, { force: true });
            cy.screenshot(`v5-esc15-${index+1}-llenarTituloContenido`);
            cy.get('span').contains('Publish').click({ force: true });
            cy.screenshot(`v5-esc15-${index+1}-publicarPagina`);
            cy.get('span').contains('Continue, final review').click();
            cy.screenshot(`v5-esc15-${index+1}-confirmarPublicacion`);
            cy.get('span[data-test-task-button-state="idle"]').contains('Publish page, right now').click();
            cy.visit('http://localhost:2368/ghost/#/pages');
            cy.contains(page).should('exist');
            cy.screenshot(`v5-esc15-${index+1}-verificarTituloContenido`);
        });
    });

    it('Escenario 18: Agregar un Miembro y Revisar su Información de Participación', () => {
        const nombre = "Nombre18";
        const email = "nombre18@gmail.com";

        cy.get('a[href="#/members/"]').click();
        cy.screenshot('v5-esc18-navegarSeccionMiembros');
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
        cy.screenshot('v5-esc18-nuevoMiembro');
        cy.get('input[data-test-input="member-name"]').type(nombre);
        cy.get('input[data-test-input="member-email"]').type(email);
        cy.screenshot('v5-esc18-llenarNombreEmail');
        cy.get('span').contains('Save').click();
        cy.screenshot('v5-esc18-guardarMiembro');
        cy.get('span').contains('Saved').should('exist');
        cy.screenshot('v5-esc18-confirmacionGuardado');
        cy.contains(email).should('exist');
        cy.screenshot('v5-esc18-verificarInformacionMiembro');
    });
    
});