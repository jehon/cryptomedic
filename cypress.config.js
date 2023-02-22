const { defineConfig } = require('cypress');

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        configFile: 'cypress-reporters.json',
    },
    videosFolder: 'tmp/e2e/desktop/videos/',
    screenshotsFolder: 'tmp/e2e/desktop/screenshots/',
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        baseUrl: 'http://localhost:80',
        specPattern: 'cypress/e2e/**/*.cy.js',
    },
});
