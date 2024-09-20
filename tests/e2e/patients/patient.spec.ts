import { expect, test } from "@playwright/test";
import { crApiLogin } from "../helpers/cr";
import { E2EPatient } from "./e2e-patients";

test("2000-001.patient.1", async ({ page }) => {
  // !! Manque le ClubFoot
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1).getFile("patient", 1).go();

  // const e2eFile = await crPatientFile(page, PATIENT_ID_2000_001);
  await e2eFile.expectOutputValue("Entry Year", 2000);
  await e2eFile.expectOutputValue("Entry Order", 1);
  await e2eFile.expectOutputValue("Phone");
  await e2eFile.expectOutputValue("Name", "rezaul islam");
  await e2eFile.expectOutputValue("Sex", "Male");
  await e2eFile.expectOutputValue("District", "Chittagong");
  await e2eFile.expectOutputValue("Pathology", "ClubFoot");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});

test("2014-103.patient", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 3).getFile("patient", 3).go();

  await e2eFile.expectOutputValue("Entry Year", 2014);
});
