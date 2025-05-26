import { test } from "@playwright/test";
import { startCryptomedic, type E2ECryptomedicType } from "../helpers/e2e";
import { E2EForm, type FieldsTypes } from "../helpers/e2e-form";
import { E2EIOPanel } from "../helpers/e2e-io-panel";
import { patientRelatedFullTest } from "../helpers/e2e-patient-related-full-test";

const GenerateYear = 2003;

const fieldsConfig: FieldsTypes = {
  Sex: "radio",
  District: "select",
  Upazila: "select",
  Union: "select"
};

function deletePatientByReference(
  cryptomedic: E2ECryptomedicType,
  entry_year: number,
  entry_order: number
): Promise<void> {
  return (
    cryptomedic
      .api(`/reference/${entry_year}/${entry_order}`)
      .then(
        (folder) =>
          folder?.id > 0
            ? cryptomedic.apiCrudDelete(`/fiche/patients/`, folder.id)
            : undefined,
        () => {
          // If the file is not found, it's ok
        }
      )
      .then(() => undefined)
      // Allow failure
      .catch((_e) => {})
  );
}

const ctx = patientRelatedFullTest({
  fileType: "patient",
  fieldsConfig
});

ctx.testRead({
  parentUrl: "/patient/1",
  fileId: "1",
  data: {
    "Entry Year": 2000,
    "Entry Order": 1,
    Phone: undefined,
    Name: "rezaul islam",
    Sex: "Male",
    District: "Chittagong",
    Pathology: "ClubFoot"
  }
});

ctx.testRead({
  parentUrl: "/patient/3",
  fileId: "3",
  data: {
    "Entry Year": 2014
  }
});

// test("delete a patient", async ({ page }) => {
//   // TODO
// });

test("update patient 101", async ({ page }) => {
  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();

  await cryptomedic.apiCrudReset("/fiche/patient", "101", {
    entry_year: 2010,
    entry_order: 1,
    name: "patient test",
    sex: "Male",
    year_of_birth: "2013-01",
    phone: "+32123123",
    address_comments: "at the end of the world",
    address_district: "Chittagong",
    address_upazilla: "Chandanish",
    address_union: "~ Other ~",
    pathology: "Ricket",
    comments: "I have something to add"
  });

  await cryptomedic.goTo(`/patient/101/patient/101`);

  const e2eIOPanel = new E2EIOPanel(
    page.getByTestId(`patient.101`),
    fieldsConfig
  );

  await e2eIOPanel.expectOutputValue("Entry Year", "2010");
  await e2eIOPanel.expectOutputValue("Entry Order", "1");
  await e2eIOPanel.expectOutputValue("Name", "patient test");

  await e2eIOPanel.doEdit();
  await cryptomedic.waitForPath(`/patient/101/patient/101/edit`);
  await e2eIOPanel.expectOutputValue("Entry Year", "2010");
  await e2eIOPanel.expectOutputValue("Entry Order", "1");
  await e2eIOPanel.expectInputValue("Name", "patient test");
  await e2eIOPanel.expectInputValue("Sex", "Male");
  await e2eIOPanel.expectInputValue("Year of Birth", "2013-01");
  await e2eIOPanel.expectInputValue("Pathology", "Ricket");
  await e2eIOPanel.expectInputValue("Phone", "+32123123");
  await e2eIOPanel.expectInputValue("District", "Chittagong");
  await e2eIOPanel.expectInputValue("Upazila", "Chandanish");
  await e2eIOPanel.expectInputValue(
    "Address Comments",
    "at the end of the world"
  );

  await e2eIOPanel.setInputValue("Name", "patient test done");
  await e2eIOPanel.setInputValue("Sex", "Female");
  await e2eIOPanel.setInputValue("District", "Cox's Bazar");
  await e2eIOPanel.setInputValue("Upazila", "Ramu");
  await e2eIOPanel.setInputValue("Union", "Eidgar");

  await e2eIOPanel.doSave();
  await cryptomedic.waitForPath(`/patient/101/patient/101`);
  await e2eIOPanel.expectOutputValue("Name", "patient test done");
  await e2eIOPanel.expectOutputValue("Sex", "Female");
  await e2eIOPanel.expectOutputValue("District", "Cox's Bazar");
  await e2eIOPanel.expectOutputValue("Upazila", "Ramu");
  await e2eIOPanel.expectOutputValue("Union", "Eidgar");
});

/********************************************
 *  Manage references
 */

test("search-reference-2001-1", async ({ page }) => {
  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();
  await cryptomedic.goTo("/home.new "); // TODO: move to /home

  const e2eForm = new E2EForm(() => page.getByTestId("search-a-reference"), {});

  await e2eForm.expectToBeVisible();
  await e2eForm.setAllInputValues({
    "Entry Year": 2001,
    "Entry Order": 1
  });

  await e2eForm.locator.getByText("Search", { exact: true }).click();

  await cryptomedic.waitForPath("/patient/6");
});

test("create-reference-2002", async ({ page }) => {
  const testEntryYear = GenerateYear + 1;
  const GenerateOrder = 123;

  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();
  await deletePatientByReference(cryptomedic, testEntryYear, GenerateOrder);
  await cryptomedic.goTo("/home.new "); // TODO: move to /home

  const e2eForm = new E2EForm(() => page.getByTestId("search-a-reference"), {});

  await e2eForm.expectToBeVisible();
  await e2eForm.setAllInputValues({
    "Entry Year": testEntryYear,
    "Entry Order": GenerateOrder
  });

  await e2eForm.locator.getByText("Search", { exact: true }).click();
  await e2eForm.locator.getByText("Create", { exact: true }).click();

  await cryptomedic.waitForPath("/patient/*/patient/*/edit");

  const newId = cryptomedic.detectId("patient", { ending: "/edit" });
  const e2eIOPanel = new E2EIOPanel(page.getByTestId(`patient.${newId}`), {});

  await e2eIOPanel.expectAllOutputValues({
    "Entry Year": testEntryYear,
    "Entry Order": GenerateOrder
  });

  // Clean up
  await e2eIOPanel.doDelete();
});

test("generate-reference", async ({ page }) => {
  const testEntryYear = GenerateYear + 2;
  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();
  await cryptomedic.goTo("/home.new "); // TODO: move to /home

  // entry_order will be set automatically to 10.000
  await deletePatientByReference(cryptomedic, testEntryYear, 10000);

  const e2eForm = new E2EForm(
    () => page.getByTestId("generate-a-reference"),
    {}
  );
  await e2eForm.expectToBeVisible();
  await e2eForm.setAllInputValues({
    "Entry Year": testEntryYear
  });
  await e2eForm.locator.getByText("Generate", { exact: true }).click();

  await cryptomedic.waitForPath("/patient/*/patient/*/edit");

  const newId = cryptomedic.detectId("patient", { ending: "/edit" });
  const e2eIOPanel = new E2EIOPanel(page.getByTestId(`patient.${newId}`), {});

  await e2eIOPanel.expectAllOutputValues({
    "Entry Year": testEntryYear,
    "Entry Order": 10000
  });

  // Clean up
  await e2eIOPanel.doDelete();
  await cryptomedic.waitForPath(`/`);
});
