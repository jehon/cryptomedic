/// <reference types="Cypress" />

import { homeGenerateReference } from '../helpers/e2e-entrynumber-assigned.js';
import { crLoginInBackground, crPage } from '../helpers/cr.js';
import { crApiPatientDelete } from '../helpers/cr-api.js';
import { guiAcceptAlert } from '../helpers/gui.js';
import { crApiLogin } from '../helpers/cr-api.js';

context('Actions', () => {
    beforeEach(() => {
        // entrynumber will be set automatically to 10.000
        crApiPatientDelete(homeGenerateReference.entryyear, homeGenerateReference.entrynumber);
    });

    it('generate a reference', () => {
        crLoginInBackground(crApiLogin.PHYSIO);

        cy.get('#autogenerate-reference').should('be.visible')
            .within(() => {
                cy.crCompareSnapshot('1-input');
                cy.get('x-button').click();
            });

        crPage().within(() => {
            cy.get('#Patient_Name').should('be.visible');

            // Edit and save
            cy.get('#Patient_entryyear').type(homeGenerateReference.entryyear);
            cy.get('#Patient_Name').type('rezaul');
            cy.crCompareSnapshot('2-complete');

            cy.get('#bottomsubmenu #patient_create').click();

            // Check readonly mode
            cy.get('span#Patient_entryyear').should('contain.text', homeGenerateReference.entryyear);
            cy.get('#Patient_Name').should('contain.text', 'rezaul');
            cy.get('#Patient_entryorder').should('contain.text', homeGenerateReference.entryorder); // Should be above 10000 as automatically generated

            cy.get('#topsubmenu #patient_edit').click();
            cy.get('#topsubmenu #patient_delete').click();

            guiAcceptAlert();

            cy.get('#page_home').should('be.visible');
            cy.hash().should('routeStartsWith', '/home');
        });
    });
});
