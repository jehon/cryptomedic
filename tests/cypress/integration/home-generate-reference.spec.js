
/// <reference types="Cypress" />

context('Actions', () => {
    it.only('generate a reference', () => {
        cy.crLogin('murshed');

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

        cy.on('window:alert', (_txt) => {
            // expect(txt).to.contains('Your full name cannot be blank.');
        });

        cy.get('#page_home').should('be.visible');
        cy.hash().should('routeStartsWith', '/home');
    });
});
