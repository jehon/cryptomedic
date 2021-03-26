
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
    // .its('status').should('be.equal', 200)
);
