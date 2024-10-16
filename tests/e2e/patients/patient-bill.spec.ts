import { outputDate } from "../helpers/e2e";
import { fullTestRead } from "../helpers/e2e-file-panel";

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "bill",
  fileId: 1,
  data: {
    Date: outputDate("2011-06-09"),
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined,
    "Price asked": 6720
  }
});
