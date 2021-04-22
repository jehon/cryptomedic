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
        var testName = ''.concat(Cypress.spec.name.replace('.js', '')).concat(name ? '-' + name : ''); // Take a screenshot and copy to baseline if it does not exist
        cy.screenshot(testName, {
            blackout: [
                '[variable]'
            ]
        });
    }
);
