describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.wait(1000);
        randomEvent(10);
    });
});

function randomEvent(monkeysLeft) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        var actions = [
            // Hacer click en un link al azar
            () => cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft--;
                }
                cy.wait(1000);
                randomEvent(monkeysLeft);
            }),
            // Llenar un campo de texto al azar
            () => cy.get('input').then($inputs => {
                var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                if(!Cypress.dom.isHidden(randomInput)) {
                    cy.wrap(randomInput).type('Monkey Testing!', {force: true});
                    monkeysLeft--;
                }
                cy.wait(1000);
                randomEvent(monkeysLeft);
            }),
            // Seleccionar un combo al azar
            () => cy.get('select').then($selects => {
                var randomSelect = $selects.get(getRandomInt(0, $selects.length));
                if(!Cypress.dom.isHidden(randomSelect)) {
                    var options = randomSelect.options;
                    var randomOption = getRandomInt(0, options.length);
                    cy.wrap(randomSelect).select(options[randomOption].value, {force: true});
                    monkeysLeft--;
                }
                cy.wait(1000);
                randomEvent(monkeysLeft);
            }),
            // Hacer click en un botón al azar
            () => cy.get('button').then($buttons => {
                var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
                if(!Cypress.dom.isHidden(randomButton)) {
                    cy.wrap(randomButton).click({force: true});
                    monkeysLeft--;
                }
                cy.wait(1000);
                randomEvent(monkeysLeft);
            })
        ];

        var randomAction = actions[getRandomInt(0, actions.length)];
        randomAction();
    }
}