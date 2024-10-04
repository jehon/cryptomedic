import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import { E2EPatient } from "./e2e-patients";

test("2000-001.picture.2", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1).getFile("picture", 2).go();

  await e2eFile.expectOutputValue("Date", outputDate("2014-11-04"));
  await e2eFile.expectOutputValue("File", "10_2014-11-06_15-32-45.JPG");
  await e2eFile.expectOutputValue("Type");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
