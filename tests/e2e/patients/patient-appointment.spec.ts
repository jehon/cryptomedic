import { expect } from "@playwright/test";
import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";
import { outputDate } from "../helpers/e2e-patients";

const ctx = fullTest({
  fileType: "appointment",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Purpose: "textarea"
  }
});

ctx.testRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileId: 2,
  data: {
    Date: "2015-04-28"
  }
});

ctx.testCreateDelete({
  patientEntryOrder: "2010-002",
  patientId: 102,
  deleteTest: (page) =>
    expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
  data: {
    Date: "2022-05-06"
  }
});

ctx.testUpdate({
  patientEntryOrder: "2010-002",
  patientId: 102,
  fileId: 102,
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
