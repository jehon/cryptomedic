import { fullTestRead } from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "consult_ricket",
  fileId: 13,
  data: {
    Date: outputDate("2014-01-04"),
    Examiner: "AMD doctor",
    "Walking Difficulties": "Level 1"
  }
});
