/// <reference types="Cypress" />

import flavorFilter from '../helpers/filter-tests.js';
import { goReport } from '../helpers/report.js';

flavorFilter(flavorFilter.DESKTOP, () =>
    context('Actions', () => {
        it('should show report', () => {
            goReport('financial',
                () => {
                    cy.get('[label="Period"] > x-input-list').invoke('attr', 'value', 'year');
                    cy.get('input[name="year"]').clear().type('2014');
                },
                (tableIterator) => tableIterator
                    .assert('1')
            );
        });
    })
);
