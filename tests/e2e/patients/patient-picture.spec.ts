import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "picture",
  fieldsConfig: {
    ...TimedFieldsConfigType
  }
});

ctx.testRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileId: 2,
  data: {
    Date: "2014-11-04",
    File: "10_2014-11-06_15-32-45.JPG",
    Type: undefined
  }
});

// 107
