import { crPage, crReady } from './cr.js';

/**
 *
 * @param {*} year of the patient
 * @param {*} order of the patient
 * @returns {Cypress.Chainable} with the Page element
 */
export function patientgo(year, order) {
    cy.get('#menu_home').click();

    cy.get('x-patient-by-reference').within(() => {
        cy.get('[name="entryyear"]').invoke('attr', 'value', year);
        cy.get('[name="entryorder"]').invoke('attr', 'value', order);
        cy.get('x-button[action="query"]').click();
    });

    crReady();
    cy.get('#Patient_entryyear').should('contain.text', year);
    cy.get('#Patient_entryorder').should('contain.text', order);

    cy.log(`Gone to patient ${year}-${order} successfully`);

    return crPage();
}

export function patientSelectFile(type, id) {
    cy.get(`#folder_menu_${type}_${id}`).should('contain.text', type);
    cy.get(`#folder_menu_${type}_${id}`).click();
    crReady();

    cy.log(`Gone to file ${type}#${id} successfully`);
}
