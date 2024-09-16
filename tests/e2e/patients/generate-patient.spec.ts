import { expect, test } from "@playwright/test";
import { crApiLogin, crInit, crLegacyInput } from "../helpers/cr";
import { E2EPatient } from "./e2e-patients";

test("create-reference-2002", async ({ page }) => {
  await crApiLogin(page);

  const GenerateYear = 2002;
  const GenerateOrder = 1234;

  await crInit(page, { page: "/home" });
  await E2EPatient.apiDelete(page, GenerateYear, GenerateOrder);

  const patientByReferencePanel = page.locator("x-patient-by-reference");
  await expect(patientByReferencePanel).toBeVisible();
  await crLegacyInput(
    patientByReferencePanel,
    "x-io-numeric[name=entry_year]",
    GenerateYear
  );
  await crLegacyInput(
    patientByReferencePanel,
    "x-io-numeric[name=entry_order]",
    GenerateOrder
  );
  await patientByReferencePanel
    .locator("button")
    .filter({ hasText: "Search" })
    .click();

  const createRefButton = patientByReferencePanel.locator("#create-reference");
  await expect(createRefButton).toBeVisible();
  await expect(patientByReferencePanel).toHaveScreenshot();

  await createRefButton.click();
  await page.waitForURL(/.+#\/folder\/.+/);

  const pey = page.locator("#Patient_entry_year");
  await expect(pey).toBeVisible();
  await expect(pey).toHaveText("" + GenerateYear);

  const peo = page.locator("#Patient_entry_order");
  await expect(peo).toBeVisible();
  await expect(peo).toHaveText("" + GenerateOrder);

  // TODO: enter some data and save it, to check if the state is still correct
});

test("generate-reference", async ({ page }) => {
  await crApiLogin(page);

  const GenerateYear = 2003;

  await crInit(page, { page: "/home" });

  // entry_order will be set automatically to 10.000
  await E2EPatient.apiDelete(page, GenerateYear, 10000);

  const patientGenerateReferencePanel = page.locator("#autogenerate-reference");
  await expect(patientGenerateReferencePanel).toBeVisible();
  await expect(patientGenerateReferencePanel).toHaveScreenshot();

  await patientGenerateReferencePanel
    .locator("x-button[action=Default]")
    .click();

  await page.waitForURL(/.+#\/folder\/.+/);

  // TODO: enter some data and save it, to check if the state is still correct
});
