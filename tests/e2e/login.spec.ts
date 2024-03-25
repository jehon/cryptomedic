import { expect, test } from "@playwright/test";
import { LOGINS, PASSWORD, crDebugHooks, crInit } from "./helpers/cr";

test("login and go to home", async ({ page }) => {
  // See playwright.config.ts:
  await crInit(page);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  await page.waitForURL(/\/login/);
  await expect(page.locator("#current-user")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);

  await page.getByLabel("Username").fill(LOGINS.RO);
  await page.getByLabel("Password").fill(PASSWORD);

  await expect(page).toHaveScreenshot();
  await page.locator(".btn-primary").click();

  await page.waitForURL(/\/home$/);
  crDebugHooks(page);

  await expect(page.locator("#current-user")).toContainText(LOGINS.RO);
  await expect(page.locator("#logout")).toBeVisible();
  await expect(page).toHaveScreenshot();
});

test("login incorrect", async ({ page }) => {
  // See playwright.config.ts:
  await crInit(page);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);

  await page.waitForURL(/\/login/);
  await expect(page.locator("#current-user")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);

  // Incorrect login

  await page.getByLabel("Username").fill(LOGINS.RO);
  await page.getByLabel("Password").fill("incorrect");
  await page.locator(".btn-primary").click();

  await expect(page.locator("#current-user")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);
  await expect(page.locator("#logout")).toHaveCount(0);
  await expect(page.getByTestId("login-error")).toBeVisible();

  // Login is still possible after
  await page.getByLabel("Password").fill(PASSWORD);
  await page.locator(".btn-primary").click();
  await page.waitForURL(/\/home$/);
});
