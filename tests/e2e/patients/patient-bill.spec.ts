import { fullTestRead, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const fieldsConfig = {
  ...TimedFieldsConfigType
};

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "bill",
  fileId: 1,
  fieldsConfig,
  data: {
    Date: "2011-06-09",
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined,
    "Price asked": 6720
  }
});
