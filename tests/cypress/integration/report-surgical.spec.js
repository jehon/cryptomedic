/// <reference types="Cypress" />

import { crLogin } from '../helpers/cr.js';
import TableIterator from '../helpers/table-iterator.js';

context('Actions', () => {
    it('should show report', () => {
        crLogin(crLogin.RO);
        cy.get('#report_surgical_menu > x-buttons > x-button').click();

        cy.get('x-page-reports x-form')
            .as('form');

        cy.get('@form').should('be.visible');

        cy.get('@form').find('[label="Period"] > x-input-list').invoke('attr', 'value', 'month');
        cy.get('@form').find('input[name="month"]').clear().type('2014-01');

        cy.get('@form').find('x-button[action="query"]').click();

        cy.get('x-page-reports x-table[count]');

        cy.get('x-page-reports x-table[empty]').should('not.exist');
        cy.get('x-page-reports x-table').as('table');


        new TableIterator('@table')
            .col(4).assert('Ukhia')
            .nextCol().assert('2014-104');

        cy.crCompareSnapshot();
    });
});
