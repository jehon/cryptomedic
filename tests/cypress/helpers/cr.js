/// <reference types="Cypress" />

import { crApiLogin } from './cr-api.js';

/**
 * Test that everything is ready
 * - no request running
 * - no (visible) image loading
 */
export function crReady() {
    cy.get('x-requestor[running]', { includeShadowDom: true })
        .should('not.exist');

    // See
    cy.get('img', { includeShadowDom: true })
        .filter('[src]')
        .filter(':visible')
        // TODO: remove logs
        .should((imgs) => imgs.map((i, /** @type {HTMLImageElement} */ img) => expect(img.naturalWidth).to.be.greaterThan(0, 'loaded: ')));
    cy.log('Ready!');
}

/**
 * Make a login using API and notify GUI
 *
 * @param {string?} username
 * @param {string?} password
 */
export function crLoginInBackground(username = null, password = null) {
    const realUser = crApiLogin(username, password);
    cy.visit('/build/');
    cy.hash().should('routeStartsWith', '/home');
    cy.get('x-user-status #user').should('have.text', realUser);
    cy.log(`Logged in as ${realUser} successfully`);
}

/**
 * Go to route
 *   and wait for "crReady"
 *
 * @param {string} route
 */
export function crGo(route) {
    cy.visit(`/build/#${route}`);
    crReady();
    cy.log(`Gone to ${route} successfully`);
}

/**
 * Get the page element
 *
 * @returns {Cypress.Chainable} with the Page element
 */
export function crPage() {
    crReady();
    return cy.get('#main_content')
        .should('be.visible');
}