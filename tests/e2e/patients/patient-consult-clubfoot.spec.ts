import {
  ConsultFieldsConfigType,
  fullTestRead
} from "../helpers/e2e-file-panel";

const fileType = "consult_clubfoot";
const fieldsConfig = {
  ...ConsultFieldsConfigType
};

// ----------------
// TODO: add this on 1st file
//       and add some data to it
fullTestRead({
  patientEntryOrder: "2014-105",
  patientId: 5,
  fileType,
  fileId: 1,
  fieldsConfig,
  data: {
    Date: "2015-01-10",
    Examiner: "Ershad",
    "Age at consultation time": "2Y"
  }
});
