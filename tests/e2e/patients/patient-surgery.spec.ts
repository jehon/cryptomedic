import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import {
  FieldsConfigType,
  fullTestCreateDelete,
  fullTestRead,
  IOV,
  TimedFieldsConfigType
} from "../helpers/e2e-file-panel";
import { E2EPatient } from "./e2e-patients";

const fieldsConfig: FieldsConfigType = {
  ...TimedFieldsConfigType
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "surgery",
  fileId: 5,
  data: {
    Date: outputDate("2014-01-02"),
    Diagnostic: "test",
    "Follow-Up Complications": "nothing"
  }
});

test("2010-003 create and delete surgery", ({ page }) =>
  fullTestCreateDelete({
    page,
    patientId: 103,
    fileType: "surgery",
    deleteTest: () =>
      expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
    initialIsAlreadyGood: true,
    fieldsConfig,
    data: {
      Date: "2022-05-06",
      Surgeon: "Surgeon says that..."
    }
  }));

test("2010-003 update surgery", async ({ page }) => {
  await crApiLogin(page);

  const e2eFile = new E2EPatient(page, 103).getFile("surgery", 103);
  await e2eFile.apiFileUpdate(103, {
    id: "103",
    date: "2023-01-07",
    report_diagnostic: "cool",
    report_surgeon: "god",
    report_side_right: 1,
    report_side_left: "",
    report_procedure: "could run again",
    follow_up_complication: "but fall from a wall"
  });

  await e2eFile.go();
  await e2eFile.expectOutputValue("Date", outputDate("2023-01-07"));
  await e2eFile.expectOutputValue("Diagnostic", "cool");
  await e2eFile.expectOutputValue("Surgeon", "god");
  await e2eFile.expectOutputValue("Left Right");
  await e2eFile.expectOutputValue("Side Right", true);
  await e2eFile.expectOutputValue("Procedure", "could run again");
  await e2eFile.expectOutputValue(
    "Follow-Up Complications",
    "but fall from a wall"
  );

  await e2eFile.goEdit();

  await e2eFile.expectInputValue("Date", "2023-01-07");
  await e2eFile.expectInputValue("Diagnostic", "cool");
  await e2eFile.expectInputValue("Surgeon", "god");
  await e2eFile.expectInputValue("Side Right", "1", "checkbox");
  await e2eFile.expectInputValue("Side Left", "0", "checkbox");
  await e2eFile.expectInputValue("Procedure", "could run again");
  await e2eFile.expectInputValue(
    "Follow-Up Complications",
    "but fall from a wall",
    "textarea"
  );

  // Change values
  await e2eFile.setFieldValue("Date", "2020-10-05");
  await e2eFile.setFieldValue("Diagnostic", "nice");
  await e2eFile.setFieldValue("Surgeon", "el diabolo");
  await e2eFile.setFieldValue("Side Right", IOV.R_NotChecked, "checkbox");
  await e2eFile.setFieldValue("Side Left", IOV.R_Checked, "checkbox");
  await e2eFile.setFieldValue("Procedure", "can sleep correctly");
  await e2eFile.setFieldValue(
    "Follow-Up Complications",
    "could not say it is best",
    "textarea"
  );

  await e2eFile.doSave();
  await e2eFile.expectOutputValue("Date", outputDate("2020-10-05"));
  await e2eFile.expectOutputValue("Diagnostic", "nice");
  await e2eFile.expectOutputValue("Surgeon", "el diabolo");
  await e2eFile.expectOutputValue("Side Left", true);
  await e2eFile.expectOutputValue("Side Right");
  await e2eFile.expectOutputValue("Procedure", "can sleep correctly");
  await e2eFile.expectOutputValue(
    "Follow-Up Complications",
    "could not say it is best"
  );
});
