/// <reference types="Cypress" />

import { crReady } from '../helpers/cr.js';

// // https://docs.cypress.io/api/commands/screenshot#Arguments
// Cypress.Commands.overwrite('screenshot',
//     // Additionnal parameter: name
//     (originalFn, subject, ...args) => {
//         // call another command, no need to return as it is managed
//         crReady();
//         console.log(args,);
//         originalFn(subject, ...(args.map(o => (typeof (o) == 'object' && o != null) ?
//             {
//                 ...o,
//                 blackout: [
//                     ...(o?.blackout ?? []),
//                     '[variable]'
//                 ]
//             }
//             : o)
//         ).map(e => console.log(e)));
//     }
// );

Cypress.Commands.add('crCompareSnapshot',
    (name = '') => {
        crReady();

        // //
        // // TODO: Remove caret while screenshot
        // //

        // // Escape within (https://docs.cypress.io/api/commands/within#Temporarily-escape)
        // cy.root().closest('html').then($body => {
        //     if ($body.find('input#no-caret').length == 0) {
        //         // Add an input and set the focus on it
        //         document.body.innerHTML += '<input id="no-caret" style="position: absolute; left: -1000px; top: 0px;">';
        //     }
        //     $body.find('input#no-caret').first().focus();
        // });

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
