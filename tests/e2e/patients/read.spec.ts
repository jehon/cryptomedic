import { expect, test } from "@playwright/test";
import { date2HumanString, normalizeDate } from "../../../src/utils/date";
import { crPatientFile } from "./cr-patients";

const PATIENT_ID = 1;
// !! Manque le ClubFoot

const ds = (v) => date2HumanString(normalizeDate(v));

test.describe("#1", async () => {
  await test("patient", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID);
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

  await test("appointment", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "appointment.2");
    await panel.expectFieldValue("Date", ds("2015-04-28"));
    await panel.expectFieldValue("Examiner", "Ershad");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  await test("bill", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "bill.1");
    await panel.expectFieldValue("Date", ds("2011-06-09"));
    await panel.expectFieldValue("Consult CDC Consultation Physio", "1");
    await panel.expectFieldValue("Consult Other");
    await panel.expectFieldValue("Price asked", 6720);
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  await test("consult-other", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "consult_other.1");
    await panel.expectFieldValue("Date", ds("2007-01-10"));
    await panel.expectFieldValue("Examiner", "Ershad");

    await panel.expectFieldValue("Weight (kg)", "29");
    await panel.expectFieldValue("Weight sd", "0.0");

    await panel.expectFieldValue("Height (cm)", "134");
    await panel.expectFieldValue("Height sd", "0.0");

    await panel.expectFieldValue("Weight/Height ratio", "0.2");
    await panel.expectFieldValue(
      "Weight/Height sd",
      "'value' is out-of-bounds: 134 [80 -> 120]"
    );
    await panel.expectFieldValue("BMI", "16.2");
    await panel.expectFieldValue("BMI sd", "-0.0");

    await panel.expectFieldValue("Joints or Bones Affected", "PBVE");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  await test("consult-ricket", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "consult_ricket.13");
    await panel.expectFieldValue("Date", ds("2014-01-04"));
    await panel.expectFieldValue("Examiner", "AMD doctor");
    await panel.expectFieldValue("Walking difficulties", "Level 1");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  await test("picture", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "picture.2");
    await panel.expectFieldValue("Date", ds("2014-11-04"));
    await panel.expectFieldValue("File", "10_2014-11-06_15-32-45.JPG");
    await panel.expectFieldValue("Type");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  test("surgery", async ({ page }) => {
    const panel = await crPatientFile(page, PATIENT_ID, "surgery.5");
    await panel.expectFieldValue("Date", ds("2014-01-02"));
    await panel.expectFieldValue("Diagnostic", "test");
    await panel.expectFieldValue("Follow-Up Complications", "nothing");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });

  // ----------------
  // TODO: add this on 1st file
  //       and add some data to it
  await test("consult-clubfoot", async ({ page }) => {
    const panel = await crPatientFile(page, 5, "consult_clubfoot.1");
    await panel.expectFieldValue("Date", ds("2015-01-10"));
    await panel.expectFieldValue("Examiner", "Ershad");
    await panel.expectFieldValue("Age at consultation time", "2Y");
    await expect(panel.form).toHaveScreenshot();
    await expect(panel.panel).toHaveScreenshot();
  });
});
