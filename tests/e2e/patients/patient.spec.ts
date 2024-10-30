import { test } from "@playwright/test";
import { crApiLogin } from "../helpers/e2e";
import { fullTest } from "../helpers/e2e-file-panel";
import { E2EPatient } from "../helpers/e2e-patients";

const ctx = fullTest({
  fileType: "patient",
  fieldsConfig: {
    Sex: "radio",
    District: "select",
    Upazila: "select",
    Union: "select"
  }
});

ctx.testRead({
  patientId: 1,
  fileId: 1,
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
  patientId: 3,
  fileId: 3,
  data: {
    "Entry Year": 2014
  }
});

// test("delete a patient", async ({ page }) => {
//   // TODO
// });

test("update patient 101", async ({ page }) => {
  await crApiLogin(page);
  const e2eFolder = new E2EPatient(page, 101);
  const e2eFile = await e2eFolder.getFile({
    fileType: "patient",
    fileId: 101,
    fieldsConfig: ctx.fieldsConfig
  });
  await e2eFile.apiFileUpdate(101, {
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
  await e2eFile.go();
  await e2eFile.expectOutputValue("Entry Year", "2010");
  await e2eFile.expectOutputValue("Entry Order", "1");
  await e2eFile.expectOutputValue("Name", "patient test");

  await e2eFile.goEdit();
  await e2eFile.expectOutputValue("Entry Year", "2010");
  await e2eFile.expectOutputValue("Entry Order", "1");
  await e2eFile.expectInputValue("Name", "patient test");
  await e2eFile.expectInputValue("Sex", "Male");
  await e2eFile.expectInputValue("Year of Birth", "2013-01");
  await e2eFile.expectInputValue("Pathology", "Ricket");
  await e2eFile.expectInputValue("Phone", "+32123123");
  await e2eFile.expectInputValue("District", "Chittagong");
  await e2eFile.expectInputValue("Upazila", "Chandanish");
  await e2eFile.expectInputValue("Address Comments", "at the end of the world");

  await e2eFile.setInputValue("Name", "patient test done");
  await e2eFile.setInputValue("Sex", "Female");
  await e2eFile.setInputValue("District", "Cox's Bazar");
  await e2eFile.setInputValue("Upazila", "Ramu");
  await e2eFile.setInputValue("Union", "Eidgar");

  await e2eFile.doSave();
  await e2eFile.expectOutputValue("Name", "patient test done");
  await e2eFile.expectOutputValue("Sex", "Female");
  await e2eFile.expectOutputValue("District", "Cox's Bazar");
  await e2eFile.expectOutputValue("Upazila", "Ramu");
  await e2eFile.expectOutputValue("Union", "Eidgar");
});
