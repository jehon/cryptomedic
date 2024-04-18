import { test } from "@playwright/test";
import { crInit } from "../helpers/cr";

test("patient page", async ({ page }) => {
  await crInit(page, { page: "/patients/1" });
  // crDebugHooks(page);
});
