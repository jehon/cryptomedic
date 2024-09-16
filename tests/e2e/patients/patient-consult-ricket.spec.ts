import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { E2EPatient } from "./e2e-patients";

test("2000-001.consult-ricket.13", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1)
    .getFile("consult_ricket", 13)
    .go();

  await e2eFile.expectFieldValue("Date", outputDate("2014-01-04"));
  await e2eFile.expectFieldValue("Examiner", "AMD doctor");
  await e2eFile.expectFieldValue("Walking Difficulties", "Level 1");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
