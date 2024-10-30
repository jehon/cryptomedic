import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "picture",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Type: "radio",
    Comments: "textarea"
  }
});

ctx.testRead({
  patientId: 1,
  fileId: 2,
  data: {
    Date: "2014-11-04",
    File: "10_2014-11-06_15-32-45.JPG",
    Type: undefined
  }
});

ctx.testCreateDelete({
  patientId: 107,
  data: {
    Type: "picture",
    Date: "2023-01-06",
    File: "test file",
    Comments: "Beautiful picture"
  }
});

ctx.testUpdate({
  patientId: 107,
  fileId: 107,
  dataInitial: {
    Type: "picture",
    Date: "2023-01-06",
    File: "test file",
    Comments: "Beautiful picture"
  },
  dataUpdated: {
    Type: "x-ray",
    Date: "2020-02-07",
    File: "test x-ray",
    Comments: "Beautiful xray"
  }
});
