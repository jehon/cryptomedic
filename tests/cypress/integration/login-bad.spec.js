
context('Actions', () => {
    it('should show error on bad login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');

        cy.get('#username').type('murshed');
        cy.get('#password').type('invalid');
        cy.get('x-button#submit').click();

        cy.get('x-page-login x-form')
            .shadow()
            .find('x-message[msg-id="invalid-credentials"')
            .should('have.text', 'Invalid credentials');

        cy.screenshot('invalid-credentials');
    });
});
