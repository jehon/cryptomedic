import { test } from "@playwright/test";
import { LOGINS, crInit } from "../helpers/cr";

test("home page", async ({ page }) => {
  await crInit(page, { login: LOGINS.PHYSIO });
});
