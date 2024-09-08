import { expect, test } from "@playwright/test";
import { crApiLogin } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

const PATIENT_ID_2000_001 = 1;
// !! Manque le ClubFoot

test("2000-001.patient.1", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, PATIENT_ID_2000_001);
  await panel.expectFieldValue("Entry Year", 2000);
  await panel.expectFieldValue("Entry Order", 1);
  await panel.expectFieldValue("Phone");
  await panel.expectFieldValue("Name", "rezaul islam");
  await panel.expectFieldValue("Sex", "Male");
  await panel.expectFieldValue("District", "Chittagong");
  await panel.expectFieldValue("Pathology", "ClubFoot");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

const PATIENT_ID_2014_103 = 3;
test("2014-103.patient", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, PATIENT_ID_2014_103);
  await panel.expectFieldValue("Entry Year", 2014);
});
