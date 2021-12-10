/// <reference types="Cypress" />

import { crReady } from '../helpers/cr.js';

Cypress.Commands.add('crCompareSnapshot',
    (name = '') => {
        crReady();

        //
        // Remove caret by putting it on the offsecreen input
        //
        //
        // Add an input to hold the focus. This input is "offscreen"
        // We do this here to enjoy the crReady delay (if necessary)
        //
        // cy.document().then(document => {
        //     if (!document.querySelector('input#no-caret')) {
        //         document.body.innerHTML += '<input id="no-caret" size="1" style="position: absolute; left: -1000px; top: 0px;" />';
        //     }
        //     // document.querySelector('input#no-caret').focus();
        // });

        // cy.root().closest('html').find('body').first().then($body => {
        //     if ($body.querySelector('input#no-caret').length == 0) {
        //         // Add an input and set the focus on it
        //         $body.innerHTML += '<input id="no-caret" style="position: absolute; left: -1000px; top: 0px;">';
        //     }
        //     $body.querySelector('input#no-caret').first().focus();
        // });

        cy.document().then(document => {
            document.querySelector('input#no-caret').focus();
        });

        // TODO: clean-up this wait, but don't know how to do that otherwise
        cy.wait(1000); /* eslint-disable-line */

        var testName = ''.concat(Cypress.spec.name.replace('.js', '')).concat(name ? '-' + name : ''); // Take a screenshot and copy to baseline if it does not exist
        cy.screenshot(testName, {
            blackout: [
                '[variable]'
            ]
        });
    }
);
