import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("2000-001.consult_clubfoot.1", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 5, "consult_clubfoot.1");
  await panel.expectFieldValue("Date", outputDate("2015-01-10"));
  await panel.expectFieldValue("Examiner", "Ershad");
  await panel.expectFieldValue("Age at consultation time", "2Y");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
