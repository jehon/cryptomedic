/// <reference types="Cypress" />

import { crPage } from '../helpers/cr.js';
import { guiHashStartWith } from '../helpers/gui.js';

context('Actions', () => {
    it('login - logout - login', () => {
        cy.visit('/build/');
        guiHashStartWith('/login');

        crPage().within(() => {
            // Login
            cy.get('#username').type('murshed');
            cy.get('#password').type('p');
            cy.get('x-button#submit').click();
            guiHashStartWith('/home');
        });

        cy.get('x-user-status #user')
            .should('have.text', 'murshed');

        // Logout
        cy.get('x-user-status x-button')
            .click();

        guiHashStartWith('/login');

        crPage().within(() => {
            // Login back again
            cy.get('#username').type('thierry');
            cy.get('#password').type('p');
            cy.get('x-button#submit').click();
        });

        cy.get('x-user-status #user')
            .should('have.text', 'thierry');
    });
});
