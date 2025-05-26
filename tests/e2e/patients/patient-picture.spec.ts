import {
  patientRelatedFullTest,
  TimedFieldsConfigType
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "picture",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Type: "radio",
    Comments: "textarea",
    File: "readonly",
    Picture: "file"
  }
});

ctx.testRead({
  patientId: "1",
  fileId: "2",
  data: {
    Date: "2014-11-04",
    File: "10_2014-11-06_15-32-45.JPG",
    Type: undefined
  }
});

ctx.testCreateDelete({
  patientId: "107",
  data: {
    Type: "picture",
    Date: "2008-07-10",
    // File: new RegExp("2010/007/2010-7.2023-01-06.[0-9]+.jpg"),
    Picture: "107-upload.jpeg",
    Comments: "Beautiful picture"
  }
});

ctx.testUpdate({
  patientId: "107",
  fileId: "107",
  dataInitial: {
    Type: "picture",
    Date: "2008-07-20",
    Comments: "Beautiful picture"
  },
  dataUpdated: {
    Type: "x-ray",
    Date: "2008-07-21",
    Comments: "Beautiful xray"
  }
});
