
// https://docs.cypress.io/api/commands/screenshot#Arguments

Cypress.Commands.add('crReady',
    () =>
        // call another command, no need to return as it is managed
        cy
            .get('x-requestor')
            .should('not.have.attr', 'running')
);