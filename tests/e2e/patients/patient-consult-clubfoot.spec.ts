import { test } from "@playwright/test";
import { outputDate } from "../helpers/e2e";
import { fullTestRead } from "../helpers/e2e-file-panel";

// ----------------
// TODO: add this on 1st file
//       and add some data to it
test("2014-105.consult_clubfoot.1", ({ page }) =>
  fullTestRead({
    page,
    patientId: 5,
    fileType: "consult_clubfoot",
    fileId: 1,
    data: {
      Date: outputDate("2015-01-10"),
      Examiner: "Ershad",
      "Age at consultation time": "2Y"
    }
  }).then(() => {}));
