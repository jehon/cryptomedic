/// <reference types="Cypress" />

import { crPage } from '../helpers/cr.js';

context('Actions', () => {
    it('should show error on bad login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');

        crPage().within(() => {
            cy.get('#username').type('murshed');
            cy.get('#password').type('invalid');
            cy.get('x-button#submit').click();

            cy.get('x-page-login').find('x-form')
                .shadow()
                .find('x-message[msg-id="invalid-credentials"')
                .should('have.text', 'Invalid credentials');

            cy.crCompareSnapshot('invalid-credentials');
        });
    });
});
