/// <reference types="Cypress" />

import { TableIterator } from '../helpers/helpers.js';

context('Actions', () => {
    it('should show report', () => {
        cy.crLogin('murshed');
        cy.get('#report_statistical_menu > x-buttons > x-button').click();

        cy.get('x-page-reports x-form')
            .as('form');

        cy.get('@form').should('be.visible');

        cy.get('@form').find('[label="Period"] > x-input-list').invoke('attr', 'value', 'month');
        cy.get('@form').find('input[name="month"]').clear().type('2014-05');

        cy.get('@form').find('x-button[action="query"]').click();

        cy.get('x-page-reports x-table[count]');

        cy.get('x-page-reports x-table[empty]').should('not.exist');
        cy.get('x-page-reports x-table').as('table');


        new TableIterator('@table')
            .row(8).col(1).assert('Club Foots')
            .nextCol().assert('5');

        cy.crCompareSnapshot();
    });
});
