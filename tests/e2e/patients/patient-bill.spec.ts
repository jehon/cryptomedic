import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "bill",
  fieldsConfig: {
    ...TimedFieldsConfigType
  }
});

ctx.testRead({
  patientId: 1,
  fileId: 1,
  data: {
    Date: "2011-06-09",
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined,
    "Price asked": 6720
  }
});

// 108
