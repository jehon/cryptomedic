import { expect, test } from "@playwright/test";
import { crApiLogin } from "../helpers/e2e";
import {
  FieldsConfigType,
  fullTestCreateDelete,
  fullTestRead,
  TimedFieldsConfigType
} from "../helpers/e2e-file-panel";
import { E2EPatient, outputDate } from "./e2e-patients";

const fieldsConfig: FieldsConfigType = {
  ...TimedFieldsConfigType
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "appointment",
  fileId: 2,
  data: {
    Date: outputDate("2015-04-28")
  }
});

test("2010-002 create and delete appointment", async ({ page }) =>
  await fullTestCreateDelete({
    page,
    patientId: 102,
    fileType: "appointment",
    deleteTest: () =>
      expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
    fieldsConfig,
    data: {
      Date: "2022-05-06"
    }
  }));

test("2010-002 update appointment", async ({ page }) => {
  await crApiLogin(page);

  const e2eFile = new E2EPatient(page, 102).getFile("appointment", 102);
  await e2eFile.apiFileUpdate(102, {
    id: "102",
    center: "",
    date: "2024-01-02",
    purpose: "test data"
  });

  await e2eFile.go();
  await e2eFile.expectOutputValue("Date", outputDate("2024-01-02"));
  await e2eFile.expectOutputValue("Center");
  await e2eFile.expectOutputValue("Purpose", "test data");

  await e2eFile.goEdit();
  await e2eFile.expectInputValue("Date", "2024-01-02");
  await e2eFile.expectInputValue("Center");
  await e2eFile.expectInputValue("Purpose", "test data");

  await e2eFile.setFieldValue("Date", "2024-10-11");
  await e2eFile.setFieldValue("Center", "Chakaria Disability Center", "select");
  await e2eFile.setFieldValue("Purpose", "test running", "textarea");

  await e2eFile.doSave();
  await e2eFile.expectOutputValue("Date", outputDate("2024-10-11"));
  await e2eFile.expectOutputValue("Center", "Chakaria Disability Center");
  await e2eFile.expectOutputValue("Purpose", "test running");
});
