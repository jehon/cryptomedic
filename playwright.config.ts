/* eslint-env node*/

import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: any = {
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  timeout: 30 * 1000,
  outputDir: "tmp/integration/playwright/test-results/",
  reporter: [
    ["list"],
    [
      "html",
      { outputFolder: "tmp/integration/playwright/report", open: "never" }
    ]
  ],
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] }
    }
  ],
  expect: {
    toHaveScreenshot: {
      stylePath: ["tests/e2e/e2e.css"]
    }
  },
  use: {}
};

//
// https://playwright.dev/docs/api/class-testconfig#test-config-snapshot-path-template
//
// See node_modules/playwright/lib/common/config.js #155
// const defaultSnapshotPathTemplate = '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{-snapshotSuffix}{ext}';
//   [...] snapshotDir: takeFirst(pathResolve(configDir, projectConfig.snapshotDir), pathResolve(configDir, config.snapshotDir), testDir),
//

if (process.env["CI"]) {
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  config.forbidOnly = true;

  // Traces: See https://playwright.dev/docs/trace-viewer#opening-the-trace
  // https://trace.playwright.dev/
  // config.retries = 3;
  config.use!.trace = "retain-on-failure";
  config.ignoreSnapshots = false;

  if (process.env["GITHUB_ACTIONS"]) {
    (config.reporter as Array<any>).push(["github"]);
    config.snapshotDir = path.join(config.testDir!, "/__github__");
  } else if (process.env["GITLAB_CI"]) {
    // (config.reporter as Array<any>).push(["gitlab"]);
    config.snapshotDir = path.join(config.testDir!, "/__gitlab__");
  } else {
    console.warn("Mode: CI but unidentified runner !!");
  }
} else {
  // config.ignoreSnapshots = true;
  config.snapshotDir = path.join(config.testDir!, "/__local__");
}

export default defineConfig(config);
