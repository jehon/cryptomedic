import { test } from "@playwright/test";
import { crInitPatient } from "./cr-patients";

test("patient page", async ({ page }) => {
  await crInitPatient(page, "/patients/1");
  // crDebugHooks(page);
});
