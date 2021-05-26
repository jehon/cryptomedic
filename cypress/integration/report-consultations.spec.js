/// <reference types="Cypress" />

import XButton from '../../app/elements/render/x-button.js';
import { goReport } from '../helpers/report.js';

context('Actions', () => {
    it('should show report', () => {
        goReport('consultations',
            () => {
                // cy.get('@form').find('[label="Period"] > x-input-list').invoke('attr', 'value', 'day');
                cy.get('x-input-date[name="day"]').invoke('attr', 'value', '2015-04-28');

                cy.get(`x-button[action="${XButton.Search}"]`).click();
            },
            tableIterator => tableIterator
                .assert('Chakaria Disability Center')
                .col(2).assert('2001-1')
        );
    });
});
