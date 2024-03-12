/*eslint-env node */

const { defineConfig } = require("cypress");

const { renameSync } = require("fs");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  e2e: {
    // TODO: use external variable CRYPTOMEDIC_LOCAL_HTTP_PORT
    baseUrl: "http://localhost:8085",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, _config) {
      // https://docs.cypress.io/api/plugins/writing-a-plugin
      on("after:screenshot", ({ path }) => {
        // Avoid files to be indexed when screenshot already exists
        renameSync(path, path.replace(/ \(\d*\)/i, ""));
      });
    }
  }
});
