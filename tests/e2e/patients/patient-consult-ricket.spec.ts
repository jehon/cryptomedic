import {
  ConsultFieldsConfigType,
  fullTestRead
} from "../helpers/e2e-file-panel";

const fileType = "consult_ricket";
const fieldsConfig = {
  ...ConsultFieldsConfigType
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType,
  fileId: 13,
  fieldsConfig,
  data: {
    Date: "2014-01-04",
    Examiner: "AMD doctor",
    "Walking Difficulties": "Level 1"
  }
});
