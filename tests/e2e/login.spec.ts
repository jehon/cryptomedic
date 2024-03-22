import { expect, test } from "@playwright/test";
import { LOGINS, PASSWORD, crUrl } from "./helpers/cr";

test("login and go to home", async ({ page }) => {
  // See playwright.config.ts:
  await page.goto(crUrl());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  await page.waitForURL(/\/login\?redirect/);
  await expect(page.locator("#current-user")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);

  await page.getByLabel("Username").fill(LOGINS.RO);
  await page.getByLabel("Password").fill(PASSWORD);

  await page.locator(".btn-primary").click();

  await page.waitForURL(/\/home$/);

  await expect(page.locator("#current-user")).toContainText(LOGINS.RO);
  await expect(page.locator("#logout")).toBeVisible();
});
