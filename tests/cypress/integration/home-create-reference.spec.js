/// <reference types="Cypress" />

import { homeCreateReference } from '../helpers/e2e-entrynumber-assigned.js';
import { crApiLogin, crApiPatientDelete } from '../helpers/cr-api.js';
import { crLoginInBackground, crPage } from '../helpers/cr.js';

context('Actions', () => {
    beforeEach(() => {
        crApiPatientDelete(homeCreateReference.entryyear, homeCreateReference.entrynumber);
    });

    it('create a reference', () => {
        crLoginInBackground(crApiLogin.PHYSIO);
        cy.get('x-patient-by-reference').within((el) => {
            cy.get('input[name=entryyear]')
                .clear()
                .type(homeCreateReference.entryyear);
            cy.get('[name=entryorder]')
                .clear()
                .type(homeCreateReference.entrynumber);

            cy.get('[action="query"]').click();

            cy.wrap(el).should('have.attr', 'status', 'creation-proposed');

            cy.crCompareSnapshot();

            cy.get('#create-reference').click({ force: true });

        });

        crPage().within(() => {
            cy.get('#Patient_entryyear').should('contain.text', homeCreateReference.entryyear);
            cy.get('#Patient_entryorder').should('contain.text', homeCreateReference.entrynumber);

            cy.get('#Patient_Name').type('rezaul');
            cy.get('#topsubmenu #patient_save').click();
        });
    });
});
