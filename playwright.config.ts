/* eslint-env node*/

import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<unknown, unknown> = {
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  timeout: 10 * 1000,
  outputDir: "tmp/integration/playwright/test-results/",
  reporter: [["list"]],
  ignoreSnapshots: false,
  projects: [
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] }
    }
  ]
};

if (process.env["CI"]) {
  if (config.reporter instanceof Array) {
    config.reporter.push(["github"]);
    config.reporter.push([
      "html",
      { outputFolder: "tmp/integration/playwright/report" }
    ]);
  }
  config.workers = 1;

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  config.forbidOnly = true;
}

if (process.env["UPDATE"]) {
  // Set by .envrc on dev
  config.ignoreSnapshots = false;
}

export default defineConfig(config);
