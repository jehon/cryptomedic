
/// <reference types="Cypress" />

import { crLogin } from '../helpers/cr.js';
import { guiAcceptAlert } from '../helpers/gui.js';

context('Actions', () => {
    it('generate a reference', () => {
        crLogin(crLogin.PHYSIO);

        cy.get('#autogenerate-reference').should('be.visible')
            .within(() => {
                cy.get('x-button').click();
            });

        cy.get('#Patient_Name').should('be.visible');

        // Edit and save
        cy.get('#Patient_entryyear').type('1998');
        cy.get('#Patient_Name').type('rezaul');
        cy.crCompareSnapshot();
        cy.get('#bottomsubmenu #patient_create').click();

        // Check readonly mode
        cy.get('span#Patient_entryyear').should('contain.text', '1998');
        cy.get('#Patient_Name').should('contain.text', 'rezaul');
        cy.get('#Patient_entryorder').should('contain.text', 10000); // Should be above 10000 as automatically generated

        cy.get('#topsubmenu #patient_edit').click();
        cy.get('#topsubmenu #patient_delete').click();

        guiAcceptAlert();

        cy.get('#page_home').should('be.visible');
        cy.hash().should('routeStartsWith', '/home');
    });
});
