
context('Actions', () => {
    it('initialize to login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');
        cy.screenshot('screen');

        cy.get('#username').type('murshed');
        cy.get('#password').type('p');
        cy.get('x-button#submit').click();

        cy.get('x-login-status #user')
            .should('have.text', 'murshed');

        cy.screenshot('logged');
    });
});
