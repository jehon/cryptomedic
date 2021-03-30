
context('Actions', () => {
    it('initialize to login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');
        cy.get('x-page-login').should('be.visible');
        cy.screenshot('screen');

        cy.get('#username').type('murshed');
        cy.get('#password').type('p');
        cy.get('x-button#submit').click();

        cy.get('x-user-status #user')
            .should('have.text', 'murshed');

        cy.screenshot('logged');
    });

    it('works also with cr-login', () => {
        cy.crLogin('murshed');
        cy.hash().should('not.routeStartsWith', '/login');
    });
});
