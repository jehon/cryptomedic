import { fullTestRead } from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

fullTestRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileType: "picture",
  fileId: 2,
  data: {
    Date: outputDate("2014-11-04"),
    File: "10_2014-11-06_15-32-45.JPG",
    Type: undefined
  }
});
