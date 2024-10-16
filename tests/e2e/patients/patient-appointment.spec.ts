import { expect } from "@playwright/test";
import {
  FieldsConfigType,
  fullTestCreateDelete,
  fullTestRead,
  TimedFieldsConfigType
} from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

const fieldsConfig: FieldsConfigType = {
  ...TimedFieldsConfigType
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "appointment",
  fileId: 2,
  fieldsConfig,
  data: {
    Date: "2015-04-28"
  }
});

await fullTestCreateDelete({
  patientEntryOrder: "2010-002",
  patientId: 102,
  fileType: "appointment",
  deleteTest: (page) =>
    expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
  fieldsConfig,
  data: {
    Date: "2022-05-06"
  }
});

// await fullTestUpdate({
//   patientEntryOrder: "2010-002",
//   patientId: 102,
//   fileType: "appointment",
//   fileId: 102,
//   fieldsConfig,
//   data: {
//     Date: "2024-01-02",
//     Center: undefined,
//     Purpose: "test data"
//   }
// });
