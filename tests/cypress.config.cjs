const { defineConfig } = require("cypress");
const { renameSync } = require("fs");
const path = require("path");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  videoFolder: path.join(
    __dirname,
    "..",
    "tmp/integration/desktop/runtime/videos"
  ),
  screenshotsFolder: path.join(
    __dirname,
    "..",
    "tmp/integration/desktop/runtime/screenshots"
  ),
  e2e: {
    // Note: BaseUrl is overriden in docker-compose
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
