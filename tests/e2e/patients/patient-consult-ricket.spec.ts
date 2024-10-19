import { ConsultFieldsConfigType, fullTest } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "consult_ricket",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    "Walking Difficulties": "select",
    Pain: "radio",
    "Wrist Enlargement": "select",
    "Rib Heading": "select"
  }
});

ctx.testRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileId: 13,
  data: {
    Date: "2014-01-04",
    Examiner: "AMD doctor",
    "Walking Difficulties": "Level 1"
  }
});
