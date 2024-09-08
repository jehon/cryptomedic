import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

test("2000-001.consult-ricket.13", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 1, "consult_ricket.13");
  await panel.expectFieldValue("Date", outputDate("2014-01-04"));
  await panel.expectFieldValue("Examiner", "AMD doctor");
  await panel.expectFieldValue("Walking Difficulties", "Level 1");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
