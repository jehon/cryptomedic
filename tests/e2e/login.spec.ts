import { expect, test } from "@playwright/test";
import { LOGINS, PASSWORD, crUrl } from "./helpers/cr";

test("has title", async ({ page }) => {
  // See playwright.config.ts:
  await page.goto(crUrl());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  await page.waitForURL(/\/login\?redirect/);

  await page.getByLabel("Username").fill(LOGINS.RO);
  await page.getByLabel("Password").fill(PASSWORD);
});
