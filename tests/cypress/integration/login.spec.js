/// <reference types="Cypress" />

import { crLogin } from '../helpers/cr.js';

context('Actions', () => {
    it('initialize to login', () => {
        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/login');
        cy.get('x-page-login').should('be.visible');
        cy.crCompareSnapshot('initial');

        cy.get('#username').type(crLogin.RO);
        cy.get('#password').type('p');
        cy.get('x-button#submit').click();

        cy.get('x-user-status #user')
            .should('have.text', crLogin.RO);

        cy.crCompareSnapshot('logged');
    });

    it('works also with cr-login', () => {
        crLogin(crLogin.RO);
        cy.hash().should('not.routeStartsWith', '/login');
    });
});
