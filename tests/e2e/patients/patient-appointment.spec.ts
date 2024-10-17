import { expect } from "@playwright/test";
import {
  FieldsConfigType,
  fullTestCreateDelete,
  fullTestRead,
  fullTestUpdate,
  TimedFieldsConfigType
} from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

const fileType = "appointment";
const fieldsConfig: FieldsConfigType = {
  ...TimedFieldsConfigType,
  Purpose: "textarea"
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType,
  fileId: 2,
  fieldsConfig,
  data: {
    Date: "2015-04-28"
  }
});

await fullTestCreateDelete({
  patientEntryOrder: "2010-002",
  patientId: 102,
  fileType,
  deleteTest: (page) =>
    expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
  fieldsConfig,
  data: {
    Date: "2022-05-06"
  }
});

await fullTestUpdate({
  patientEntryOrder: "2010-002",
  patientId: 102,
  fileType,
  fileId: 102,
  fieldsConfig,
  dataInitial: {
    Date: "2024-01-02",
    Center: undefined,
    Purpose: "test data"
  },
  dataUpdated: {
    Date: "2024-10-11",
    Center: "Chakaria Disability Center",
    Purpose: "test running"
  }
});
