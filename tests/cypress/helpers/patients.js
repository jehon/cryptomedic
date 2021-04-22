import { crReady } from './cr.js';

export function goPatient(year, order) {
    cy.get('#menu_home').click();

    cy.get('x-patient-by-reference').shadow().as('xpbr');

    cy.get('@xpbr').find('[name="entryyear"]').invoke('attr', 'value', year);
    cy.get('@xpbr').find('[name="entryorder"]').invoke('attr', 'value', order);
    cy.get('@xpbr').find('x-button[action="query"]').click();

    crReady();
    cy.get('#Patient_entryyear').should('contain.text', year);
    cy.get('#Patient_entryorder').should('contain.text', order);
}

export function selectFile(type, id) {
    cy.get(`#folder_menu_${type}_${id}`).should('contain.text', type);
    cy.get(`#folder_menu_${type}_${id}`).click();
    crReady();
}
