/// <reference types="Cypress" />

import { patientCrudCreateReference, patientCrudGenerateReference } from '../helpers/e2e-entrynumber-assigned.js';
import { crApiLogin, crApiPatientDelete } from '../helpers/cr-api.js';
import { crLoginInBackground, crPage } from '../helpers/cr.js';
import { guiAcceptAlert, guiHashStartWith } from '../helpers/gui.js';

context('Actions', () => {
    beforeEach(() => {
        crLoginInBackground(crApiLogin.PHYSIO);

        crApiPatientDelete(patientCrudCreateReference.entryyear, patientCrudCreateReference.entrynumber);

        // entrynumber will be set automatically to 10.000
        crApiPatientDelete(patientCrudGenerateReference.entryyear, patientCrudGenerateReference.entrynumber);
    });

    it('create a reference', () => {
        cy.get('x-patient-by-reference').within((el) => {
            cy.get('input[name=entryyear]')
                .clear()
                .type(patientCrudCreateReference.entryyear);
            cy.get('[name=entryorder]')
                .clear()
                .type(patientCrudCreateReference.entrynumber);

            cy.get('[action="query"]').click();

            cy.wrap(el).should('have.attr', 'status', 'creation-proposed');

            cy.crCompareSnapshot('create');

            cy.get('#create-reference').click({ force: true });

        });

        crPage().within(() => {
            cy.get('#Patient_entryyear').should('contain.text', patientCrudCreateReference.entryyear);
            cy.get('#Patient_entryorder').should('contain.text', patientCrudCreateReference.entrynumber);

            cy.get('#Patient_Name').type('rezaul');
            cy.get('#topsubmenu #patient_save').click();
        });
    });

    it('generate a reference', () => {
        cy.get('#autogenerate-reference').should('be.visible')
            .within(() => {
                cy.crCompareSnapshot('generate-1-input');
                cy.get('x-button').click();
            });

        crPage().within(() => {
            cy.get('#Patient_Name').should('be.visible');

            // Edit and save
            cy.get('#Patient_entryyear').type(patientCrudGenerateReference.entryyear);
            cy.get('#Patient_Name').type('rezaul');
            cy.crCompareSnapshot('generate-2-complete');

            cy.get('#bottomsubmenu #patient_create').click();

            // Check readonly mode
            cy.get('span#Patient_entryyear').should('contain.text', patientCrudGenerateReference.entryyear);
            cy.get('#Patient_Name').should('contain.text', 'rezaul');
            cy.get('#Patient_entryorder').should('contain.text', patientCrudGenerateReference.entryorder); // Should be above 10000 as automatically generated

            cy.get('#topsubmenu #patient_edit').click();
            cy.get('#topsubmenu #patient_delete').click();

            guiAcceptAlert();

            cy.get('#page_home').should('be.visible');
            guiHashStartWith('/home');
        });
    });

    // it('edit and cancel patient', () => {
    //         cy.get('#button_patient').click();
    //         cy.get('#topsubmenu #patient_edit').click();
    //         client.waitForElementPresent('input#Patient_Name');
    //         client.assert.value('#Patient_Name', 'mozahar ahamed');
    //         client.mySetAttribute('[name=Pathology]', 'value', 'ClubFoot');
    //         cy.get('#Patient_Name').type('rezaul');
    //         cy.get('#topsubmenu #patient_cancel').click();
    //         client.waitForElementPresent('#Patient_Name');
    //         cy.get('#Patient_Name').should('contain.text', 'mozahar ahamed');
    // });

});
