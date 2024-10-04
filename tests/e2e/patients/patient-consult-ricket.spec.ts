import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import { E2EPatient } from "./e2e-patients";

test("2000-001.consult-ricket.13", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1)
    .getFile("consult_ricket", 13)
    .go();

  await e2eFile.expectOutputValue("Date", outputDate("2014-01-04"));
  await e2eFile.expectOutputValue("Examiner", "AMD doctor");
  await e2eFile.expectOutputValue("Walking Difficulties", "Level 1");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
