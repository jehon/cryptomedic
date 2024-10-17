import { expect } from "@playwright/test";
import { outputDate } from "../helpers/e2e";
import {
  fullTest,
  IOV,
  TimedFieldsConfigType
} from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "surgery",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    "Side Right": "checkbox",
    "Side Left": "checkbox",
    "Follow-Up Complications": "textarea"
  }
});

ctx.testRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileId: 5,
  data: {
    Date: "2014-01-02",
    Diagnostic: "test",
    "Follow-Up Complications": "nothing"
  }
});

ctx.testCreateDelete({
  patientEntryOrder: "2010-003",
  patientId: 103,
  deleteTest: (page) =>
    expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0),
  initialIsAlreadyGood: true,
  data: {
    Date: "2022-05-06",
    Surgeon: "Surgeon says that..."
  }
});

ctx.testUpdate({
  patientEntryOrder: "2010-003",
  patientId: 103,
  fileId: 103,
  dataInitial: {
    Date: "2023-01-07",
    Diagnostic: "cool",
    Surgeon: "god",
    "Left Right": undefined,
    "Side Right": true,
    Procedure: "could run again",
    "Follow-Up Complications": "but fall from a wall"
  },
  dataUpdated: {
    Date: "2020-10-05",
    Diagnostic: "nice",
    Surgeon: "el diabolo",
    "Side Right": IOV.R_NotChecked,
    "Side Left": IOV.R_Checked,
    Procedure: "can sleep correctly",
    "Follow-Up Complications": "could not say it is best"
  }
});
