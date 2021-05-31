import XButton from '../../app/widgets/style/x-button.js';
import { crPage, crReady } from './cr.js';

/**
 * @param {object} patient
 * @property {number|string} entryyear of the patient
 * @property {number|string} entryorder of the patient
 * @returns {Cypress.Chainable} with the Page element
 */
export function patientgo(patient) {
    cy.visit('/build/');

    cy.get('#menu_home').click();

    cy.get('x-patient-by-reference').within(() => {
        cy.get('[name="entryyear"]').invoke('attr', 'value', patient.entryyear);
        cy.get('[name="entryorder"]').invoke('attr', 'value', patient.entryorder);
        cy.get(`x-button[action="${XButton.Search}"]`).click();
    });

    crReady();
    cy.get('#Patient_entryyear').should('contain.text', patient.entryyear);
    cy.get('#Patient_entryorder').should('contain.text', patient.entryorder);

    cy.log(`Gone to patient ${patient.entryyear}-${patient.entryorder} successfully`);

    crReady();

    return crPage();
}

export function patientSelectFile(type, id) {
    cy.get(`#folder_menu_${type}_${id}`).should('contain.text', type);
    cy.get(`#folder_menu_${type}_${id}`).click();
    crReady();

    cy.log(`Gone to file ${type}#${id} successfully`);
}
