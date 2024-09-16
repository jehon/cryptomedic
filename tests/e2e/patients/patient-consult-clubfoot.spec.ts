import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { E2EPatient } from "./e2e-patients";

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("2000-001.consult_clubfoot.1", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 5)
    .getFile("consult_clubfoot", 1)
    .go();

  await e2eFile.expectFieldValue("Date", outputDate("2015-01-10"));
  await e2eFile.expectFieldValue("Examiner", "Ershad");
  await e2eFile.expectFieldValue("Age at consultation time", "2Y");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
