import { test } from "@playwright/test";
import { crInit } from "./helpers/cr";

test("home page", async ({ page }) => {
  await crInit(page, { login: null });
});
