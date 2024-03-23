import { expect, test } from "@playwright/test";
import { LOGINS, PASSWORD, crDebugHooks, crInit } from "./helpers/cr";

test("login and go to home", async ({ page }) => {
  crDebugHooks(page);

  // See playwright.config.ts:
  await crInit(page);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);
  await expect(page).toHaveScreenshot();

  await page.waitForURL(/\/login/);
  await expect(page.locator("#current-user")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);

  await page.getByLabel("Username").fill(LOGINS.RO);
  await page.getByLabel("Password").fill(PASSWORD);

  await page.locator(".btn-primary").click();

  await page.waitForURL(/\/home$/);
  crDebugHooks(page);

  await expect(page.locator("#current-user")).toContainText(LOGINS.RO);
  await expect(page.locator("#logout")).toBeVisible();
});
