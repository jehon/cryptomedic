import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import { E2EPatient } from "./e2e-patients";

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("2014-105.consult_clubfoot.1", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 5)
    .getFile("consult_clubfoot", 1)
    .go();

  await e2eFile.expectOutputValue("Date", outputDate("2015-01-10"));
  await e2eFile.expectOutputValue("Examiner", "Ershad");
  await e2eFile.expectOutputValue("Age at consultation time", "2Y");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
