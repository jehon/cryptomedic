
context('Actions', () => {
    it('login - logout - login', () => {
        cy.visit('/build/');
        cy.hash().should('eq', '#/login/');

        // Login
        cy.get('#username').type('murshed');
        cy.get('#password').type('p');
        cy.get('x-button#submit').click();
        cy.hash().should('routeStartsWith', '/home');

        cy.get('x-login-status #user')
            .should('have.text', 'murshed');

        // Logout
        cy.get('x-login-status x-button')
            .click();

        cy.hash().should('routeStartsWith', '/login');

        // Login back again
        cy.get('#username').type('thierry');
        cy.get('#password').type('p');
        cy.get('x-button#submit').click();

        cy.get('x-login-status #user')
            .should('have.text', 'thierry');
    });
});
