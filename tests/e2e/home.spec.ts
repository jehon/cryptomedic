import { expect, test } from "@playwright/test";
import { crUrl } from "./helpers/cr";

test("has title", async ({ page }) => {
  await page.goto(crUrl());

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cryptomedic/);
});
