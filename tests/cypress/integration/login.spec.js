/// <reference types="Cypress" />

import { crApiLogin } from '../helpers/cr-api.js';
import { crLoginInBackground, crPage } from '../helpers/cr.js';

context('Actions', () => {
    it('initialize to login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');
        crPage().within(() => {

            cy.get('x-page-login').should('be.visible');
            cy.crCompareSnapshot('x-page-login');

            cy.get('#username').type(crApiLogin.RO);
            cy.get('#password').type('p');
            cy.get('x-button#submit').click();
        });

        cy.get('x-user-status').within(() => {
            cy.get('#user').should('have.text', crApiLogin.RO);
            cy.crCompareSnapshot('x-user-status');
        });
    });

    it('works also with crLoginInBackground', () => {
        crLoginInBackground(crApiLogin.RO);
        cy.hash().should('not.routeStartsWith', '/login');
        cy.get('x-user-status #user')
            .should('have.text', crApiLogin.RO);
    });
});
