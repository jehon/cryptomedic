/// <reference types="Cypress" />

import { crApiLogin } from '../helpers/cr-api.js';
import { crLoginInBackground, crPage } from '../helpers/cr.js';
import { guiHashStartWith } from '../helpers/gui.js';

context('Actions', () => {
    it('initialize to login', () => {
        cy.visit('/build/');
        guiHashStartWith('/login');
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
        guiHashStartWith('/home');
        cy.get('x-user-status #user')
            .should('have.text', crApiLogin.RO);
    });
});
