import { test } from "@playwright/test";
import { crDebugHooks, crInit } from "../helpers/cr";

test("patient page", async ({ page }) => {
  await crInit(page);
  crDebugHooks(page);
});
