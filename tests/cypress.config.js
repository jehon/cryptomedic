/*eslint-env node */

const { defineConfig } = require("cypress");

const { renameSync } = require("fs");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  videosFolder: "../tmp/integration/runtime/desktop/videos/",
  screenshotsFolder: "../tmp/integration/runtime/desktop/screenshots/",
  e2e: {
    baseUrl: "http://localhost:5555",
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
