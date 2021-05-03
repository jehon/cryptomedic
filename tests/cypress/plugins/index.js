
/// <reference types="cypress" />
// See https://on.cypress.io/plugins-guide

const { renameSync } = require('fs');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // https://github.com/uktrade/cypress-image-diff/blob/main/docs/Cypress%20integration.md

    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    // https://github.com/meinaart/cypress-plugin-snapshots
    require('cypress-plugin-snapshots/plugin').initPlugin(on, config);

    // Avoid files to be indexed when screenshot already exists
    on('after:screenshot', ({ path }) => {
        renameSync(path, path.replace(/ \(\d*\)/i, ''));
    });
};
