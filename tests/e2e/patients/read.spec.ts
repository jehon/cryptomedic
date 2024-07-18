import { expect, test } from "@playwright/test";
import { date2HumanString, normalizeDate } from "../../../src/utils/date";
import { crPatientFile } from "./cr-patients";

const PATIENT_ID = 1;
// !! Manque le ClubFoot

const ds = (v) => date2HumanString(normalizeDate(v));

test("patient", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID);
  await panel.expectFieldValue("Entry Year", 2000);
  await panel.expectFieldValue("Entry Order", 1);
  await panel.expectFieldValue("Phone");
  await panel.expectFieldValue("Pathology", "ClubFoot");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("appointment", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "appointment.2");
  await panel.expectFieldValue("Date", ds("2015-04-28"));
  await panel.expectFieldValue("Examiner", "Ershad");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("bill", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "bill.1");
  await panel.expectFieldValue("Date", ds("2011-06-09"));
  await panel.expectFieldValue("Consult CDC Consultation Physio", "1");
  await panel.expectFieldValue("Consult Other");
  await panel.expectFieldValue("Price asked", 6720);
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("consult-other", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "consult_other.1");
  await panel.expectFieldValue("Date", ds("2007-01-10"));
  await panel.expectFieldValue("Examiner", "Ershad");
  await panel.expectFieldValue("Joints or Bones Affected", "PBVE");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("consult-ricket", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "consult_ricket.13");
  await panel.expectFieldValue("Date", ds("2014-01-04"));
  await panel.expectFieldValue("Examiner", "AMD doctor");
  await panel.expectFieldValue("Walking difficulties", "Level 1");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("picture", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "picture.2");
  await panel.expectFieldValue("Date", ds("2014-11-04"));
  await panel.expectFieldValue("Type");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("surgery", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "surgery.5");
  await panel.expectFieldValue("Date", ds("2014-01-02"));
  await panel.expectFieldValue("Diagnostic", "test");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("consult-clubfoot", async ({ page }) => {
  const panel = await crPatientFile(page, 5, "consult_clubfoot.1");
  await panel.expectFieldValue("Date", ds("2015-01-10"));
  await panel.expectFieldValue("Examiner", "Ershad");
  await panel.expectFieldValue("Age at consultation time", "2Y");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
