import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

test("2000-001.surgery.5", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 1, "surgery.5");
  await panel.expectFieldValue("Date", outputDate("2014-01-02"));
  await panel.expectFieldValue("Diagnostic", "test");
  await panel.expectFieldValue("Follow-Up Complications", "nothing");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
