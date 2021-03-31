
//
//
//
Cypress.Commands.add('crReady',
    () => cy
        .get('x-requestor')
        .should('not.have.attr', 'running')
);

//
// https://docs.cypress.io/api/commands/request
//
Cypress.Commands.add('crApi',
    /**
     * @param {object} options
     * @property {string} url of the call
     * @property {string?} method of the call
     * @returns {*} to chain
     */
    (options = {}) =>
        cy
            .request({
                ...options,
                url: options.url[0] == '/' ? options.url : `/api/v1.3/${options.url}`
            })
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
        return cy.get('x-user-status #user').should('have.text', username);
    }
);

Cypress.Commands.add('crGo',
    (route) => cy.visit(`/build/#${route}`)
);


// https://docs.cypress.io/api/commands/screenshot#Arguments

Cypress.Commands.overwrite('screenshot',
    (originalFn, subject, name, options) =>
        // call another command, no need to return as it is managed
        cy
            .crReady()
            // Call initial command
            .then(() => originalFn(subject, name, {
                ...options,
                blackout: [
                    ...(options?.blackout ?? []),
                    '[variable]'
                ]
            }))
);

Cypress.Commands.add('crCompareSnapshot',
    (title) => {
        cy.crReady();
        return cy.compareSnapshot(title, {
            capture: 'fullPage',
            errorThreshold: 0.1
        });
    }
);
