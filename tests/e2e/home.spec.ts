import { test } from "@playwright/test";
import { crDebugHooks, crInit } from "./helpers/cr";

test("home page", async ({ page }) => {
  crDebugHooks(page);
  await crInit(page);
});
