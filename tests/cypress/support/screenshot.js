
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