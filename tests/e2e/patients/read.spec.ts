import { expect, test } from "@playwright/test";
import { crPatientFile, outputDate } from "./cr-patients";

const PATIENT_ID_2001_001 = 1;
// !! Manque le ClubFoot

test("2001-001.patient.1", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2001_001);
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

test("2001-001.appointment.2", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2001_001, "appointment.2");
  await panel.expectFieldValue("Date", outputDate("2015-04-28"));
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2001-001.bill.1", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2001_001, "bill.1");
  await panel.expectFieldValue("Date", outputDate("2011-06-09"));
  await panel.expectFieldValue("Consult CDC Consultation Physio", "1");
  await panel.expectFieldValue("Consult Other");
  await panel.expectFieldValue("Price asked", 6720);
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2001-001.consult-other.1", async ({ page }) => {
  const panel = await crPatientFile(
    page,
    PATIENT_ID_2001_001,
    "consult_other.1"
  );
  await panel.expectFieldValue("Date", outputDate("2007-01-10"));
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

test("2001-001.consult-ricket.13", async ({ page }) => {
  const panel = await crPatientFile(
    page,
    PATIENT_ID_2001_001,
    "consult_ricket.13"
  );
  await panel.expectFieldValue("Date", outputDate("2014-01-04"));
  await panel.expectFieldValue("Examiner", "AMD doctor");
  await panel.expectFieldValue("Walking difficulties", "Level 1");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2001-001.picture.2", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2001_001, "picture.2");
  await panel.expectFieldValue("Date", outputDate("2014-11-04"));
  await panel.expectFieldValue("File", "10_2014-11-06_15-32-45.JPG");
  await panel.expectFieldValue("Type");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2001-001.surgery.5", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2001_001, "surgery.5");
  await panel.expectFieldValue("Date", outputDate("2014-01-02"));
  await panel.expectFieldValue("Diagnostic", "test");
  await panel.expectFieldValue("Follow-Up Complications", "nothing");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("2001-001.consult_clubfoot.1", async ({ page }) => {
  const panel = await crPatientFile(page, 5, "consult_clubfoot.1");
  await panel.expectFieldValue("Date", outputDate("2015-01-10"));
  await panel.expectFieldValue("Examiner", "Ershad");
  await panel.expectFieldValue("Age at consultation time", "2Y");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

const PATIENT_ID_2014_103 = 3;
test("2014-103.patient", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2014_103);
  await panel.expectFieldValue("Entry Year", 2014);
});

test("2014-103.bill.2", async ({ page }) => {
  const panel = await crPatientFile(page, PATIENT_ID_2014_103, "bill.2");
  await panel.expectFieldValue("Family Salary", 4500);
  const paymentPanel = await page.getByTestId("bill.2.payments");
  await expect(paymentPanel).toBeVisible();
  const payment2 = paymentPanel.getByTestId("payment.2");
  await expect(payment2).toBeVisible();
  await expect(payment2.getByText("Second payment")).toBeVisible();
});
