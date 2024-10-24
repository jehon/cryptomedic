/* eslint-env node*/

import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<unknown, unknown> = {
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
  ],
  expect: {
    toHaveScreenshot: {
      stylePath: ["tests/e2e/e2e.css"]
    }
  },
  use: {}
};

if (process.env["CI"]) {
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  config.forbidOnly = true;

  // Traces: See https://playwright.dev/docs/trace-viewer#opening-the-trace
  // https://trace.playwright.dev/
  config.retries = 3;
  config.use!.trace = "retain-on-failure";
  config.ignoreSnapshots = false;

  if (process.env["GITHUB_ACTIONS"]) {
    console.info("Mode: GitHub Actions");
    (config.reporter as Array<any>).push(["github"]);
  } else if (process.env["GITLAB_CI"]) {
    console.info("Mode: GitLab CI");
    // config.retries = 1;
    // (config.reporter as Array<any>).push(["gitlab"]);
  } else {
    console.warn("Mode: CI but unidentified runner !!");
  }
} else {
  console.info("Mode: Local run");
  config.ignoreSnapshots = true;
}

export default defineConfig(config);
