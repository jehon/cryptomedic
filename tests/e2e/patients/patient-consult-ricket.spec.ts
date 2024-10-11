import { test } from "@playwright/test";
import { fullTestRead } from "../helpers/e2e-file-panel";
import { outputDate } from "./e2e-patients";

test("2000-001.consult-ricket.13", ({ page }) =>
  fullTestRead({
    page,
    patientId: 1,
    fileType: "consult_ricket",
    fileId: 13,
    data: {
      Date: outputDate("2014-01-04"),
      Examiner: "AMD doctor",
      "Walking Difficulties": "Level 1"
    }
  }).then(() => {}));
