import { expect, test } from "@playwright/test";
import { crPatientFile, outputDate } from "./cr-patients";

// See 320 test appointment.sql for data

test("read 2001-001.appointment.2", async ({ page }) => {
  const panel = await crPatientFile(page, 1, "appointment.2");
  await panel.expectFieldValue("Date", outputDate("2015-04-28"));
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
