/// <reference types="Cypress" />

import { crLogin } from '../helpers/cr.js';
import TableIterator from '../helpers/table-iterator.js';

context('Actions', () => {
    it('should show report', () => {
        crLogin(crLogin.RO);
        cy.get('#report_consultations_menu > x-buttons > x-button').click();

        cy.get('x-page-reports x-form')
            .as('form');

        cy.get('@form').should('be.visible');

        // cy.get('@form').find('[label="Period"] > x-input-list').invoke('attr', 'value', 'day');
        cy.get('@form').find('x-input-date[name="day"]').invoke('attr', 'value', '2015-04-28');

        cy.get('@form').find('x-button[action="query"]').click();

        cy.get('x-page-reports x-table[count]');

        cy.get('x-page-reports x-table[empty]').should('not.exist');
        cy.get('x-page-reports x-table').as('table');

        new TableIterator('@table')
            .assert('Chakaria Disability Center')
            .col(2).assert('2001-1');

        cy.crCompareSnapshot();
    });
});
