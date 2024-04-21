import { test } from "@playwright/test";
import { crPatientFile } from "./cr-patients";

const PATIENT_ID = 1;
// !! Manque le ClubFoot

test("patient", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID);
  await panel.expectFieldValue("Entry Year", 2000);
  await panel.expectFieldValue("Entry Order", 1);
  await panel.expectFieldValue("Phone");
  await panel.expectFieldValue("Pathology", "ClubFoot");
});

test("appointment", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "appointment.2");
  await panel.expectFieldValue("Date", "2015-04-28");
  await panel.expectFieldValue("Examiner", "Ershad");
});

// test("bill", async ({ page }) => {
// const panel = await crPatientFile(page, PATIENT_ID, "bill.1");
// await panel.expectFieldValue("Date", "2015-04-28");
// await panel.expectFieldValue("Examiner", "Ershad");
// });

// test("consult-clubfoot", async ({ page }) => {
//   const panel = await crPatientFile(page, PATIENT_ID, "consult-clubfoot.xxx");
//   await panel.expectFieldValue("Date", "2015-04-28");
//   await panel.expectFieldValue("Examiner", "Ershad");
// });

// test("consult-other", async ({ page }) => {
//   const panel = await crPatientFile(page, PATIENT_ID, "consult-other.1");
//   await panel.expectFieldValue("Date", "2015-04-28");
//   await panel.expectFieldValue("Examiner", "Ershad");
// });

// test("consult-ricket", async ({ page }) => {
//   const panel = await crPatientFile(page, PATIENT_ID, "consult-ricket.13");
//   await panel.expectFieldValue("Date", "2015-04-28");
//   await panel.expectFieldValue("Examiner", "Ershad");
// });

test("picture", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "picture.2");
  await panel.expectFieldValue("Date", "2014-11-04");
  await panel.expectFieldValue("Type");
});

test("surgery", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID, "surgery.5");
  await panel.expectFieldValue("Date", "2014-01-02");
  await panel.expectFieldValue("Diagnostic", "test");
});