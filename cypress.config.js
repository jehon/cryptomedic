const { defineConfig } = require('cypress');

const { renameSync } = require('fs');

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
        baseUrl: 'http://localhost:5555',
        setupNodeEvents(on, _config) {
            // https://docs.cypress.io/api/plugins/writing-a-plugin
            on('after:screenshot', ({ path }) => {
                // Avoid files to be indexed when screenshot already exists
                renameSync(path, path.replace(/ \(\d*\)/i, ''));
            });
        }
    },
});
