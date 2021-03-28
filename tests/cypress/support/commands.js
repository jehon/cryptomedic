
//
//
//
Cypress.Commands.add('crReady',
    () =>
        // call another command, no need to return as it is managed
        cy
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
        return cy.get('x-login-status #user').should('have.text', username);
    }
);

Cypress.Commands.add('crGo',
    (route) => cy.visit(`/build/#${route}`)
);
