/// <reference types="Cypress" />

import configFilter from '../helpers/filter-tests.js';
import { goReport } from '../helpers/report.js';

configFilter(configFilter.DESKTOP, () =>
    context('Actions', () => {
        it('should show report', () => {
            goReport('surgical',
                () => {
                    cy.get('[label="Period"] > x-input-list').invoke('attr', 'value', 'month');
                    cy.get('input[name="month"]').clear().type('2014-01');
                },
                tableIterator => tableIterator
                    .col(4).assert('Ukhia')
                    .nextCol().assert('2014-104')
            );
        });
    })
);
