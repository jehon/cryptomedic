import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

test("2000-001.picture.2", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 1, "picture.2");
  await panel.expectFieldValue("Date", outputDate("2014-11-04"));
  await panel.expectFieldValue("File", "10_2014-11-06_15-32-45.JPG");
  await panel.expectFieldValue("Type");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
