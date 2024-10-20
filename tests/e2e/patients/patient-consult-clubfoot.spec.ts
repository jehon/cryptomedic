import { ConsultFieldsConfigType, fullTest } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "consult_clubfoot",
  fieldsConfig: {
    ...ConsultFieldsConfigType
  }
});

// ----------------
// TODO: add this on 1st file
//       and add some data to it
ctx.testRead({
  patientEntryOrder: "2014-105",
  patientId: 5,
  fileId: 1,
  data: {
    Date: "2015-01-10",
    Examiner: "Ershad",
    "Age at consultation time": "2Y"
  }
});
