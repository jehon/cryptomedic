
//
Cypress.Commands.add('crReady', () => {
    cy.get('x-requestor')
        .should('not.have.attr', 'running');
});

//
// https://docs.cypress.io/api/commands/request
//
Cypress.Commands.add('crApi',
    /**
     * @param {object} options
     * @property {string} url of the call
     * @property {string?} method of the call
     */
    (options = {}) => {
        cy.request({
            ...options,
            url: options.url[0] == '/' ? options.url : `/api/v1.3/${options.url}`
        });
    }
);

Cypress.Commands.add('crLogin',
    (username, password = null) => {
        cy.crApi({
            url: 'auth/mylogin', method: 'POST', body: {
                username: username ?? 'murshed',
                password: password ?? 'p'
            }
        });

        cy.visit('/build/');
        cy.hash().should('routeStartsWith', '/home');
        cy.get('x-user-status #user').should('have.text', username);
    }
);

Cypress.Commands.add('crGo', (route) => {
    cy.visit(`/build/#${route}`);
    cy.crReady();
});


// // https://docs.cypress.io/api/commands/screenshot#Arguments
// Cypress.Commands.overwrite('screenshot',
//     // Additionnal parameter: name
//     (originalFn, subject, ...args) => {
//         // call another command, no need to return as it is managed
//         cy.crReady();
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
        cy.crReady();
        var testName = ''.concat(Cypress.spec.name.replace('.js', '')).concat(name ? '-' + name : ''); // Take a screenshot and copy to baseline if it does not exist
        cy.screenshot(testName, {
            blackout: [
                '[variable]'
            ]
        });
    }
);
