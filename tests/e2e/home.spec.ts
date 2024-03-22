import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  // See playwright.config.ts:
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);
});
