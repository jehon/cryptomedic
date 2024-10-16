import { expect, test } from "@playwright/test";
import {
  consultBasicData,
  ConsultFieldsConfigType,
  FieldsConfigType,
  fullTestCreateDelete,
  fullTestRead
} from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

const fieldsConfig: FieldsConfigType = {
  ...ConsultFieldsConfigType,
  Side: "radio",
  Pain: "radio",
  Walk: "radio"
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "consult_other",
  fileId: 1,
  data: {
    Date: outputDate("2007-01-10"),
    Examiner: "Ershad",
    "Weight (kg)": "29",
    "Weight sd": "0.0",
    "Height (cm)": "134",
    "Height sd": "0.0",
    "Weight/Height ratio": "0.2",
    "Weight/Height sd": "'value' is out-of-bounds: 134 [80 -> 120]",
    BMI: "16.2",
    "BMI sd": "-0.0",
    "Joints or Bones Affected": "PBVE"
  }
});

test("2010-004 create and delete consult other", ({ page }) =>
  fullTestCreateDelete({
    page,
    patientId: 104,
    fileType: "consult_other",
    fieldsConfig,
    deleteTest: () =>
      expect(page.getByText(outputDate("2022-10-04"))).toHaveCount(0),
    data: {
      ...consultBasicData,

      Side: "Left",
      "Joints or Bones Affected": "some there",
      Deformity: "",
      "Articulation Mobility": "quiet mobile",
      "Muscle Strength": "strong!",
      Pain: "Moderate"
    }
  }));

// test("2010-004 update consult other", async ({ page }) => {
//   await crApiLogin(page);

//   const e2eFile = new E2EPatient(page, 104).getFile("consult_other", 104);
//   await e2eFile.apiFileUpdate(104, {
//     //     id: "104",
//     //     center: "",
//     //     date: "2024-01-02",
//     //     purpose: "test data"
//   });

//   await e2eFile.go();
//   //   await e2eFile.expectOutputValue("Date", outputDate("2024-01-02"));
//   //   await e2eFile.expectOutputValue("Center");
//   //   await e2eFile.expectOutputValue("Purpose", "test data");

//   //   await e2eFile.goEdit();
//   //   await e2eFile.expectInputValue("Date", "2024-01-02");
//   //   await e2eFile.expectInputValue("Center");
//   //   await e2eFile.expectInputValue("Purpose", "test data");

//   //   await e2eFile.setFieldValue("Date", "2024-10-11");
//   //   await e2eFile.setFieldValue("Center", "Chakaria Disability Center", "select");
//   //   await e2eFile.setFieldValue("Purpose", "test running", "textarea");

//   //   await e2eFile.doSave();
//   //   await e2eFile.expectOutputValue("Date", outputDate("2024-10-11"));
//   //   await e2eFile.expectOutputValue("Center", "Chakaria Disability Center");
//   //   await e2eFile.expectOutputValue("Purpose", "test running");
// });
