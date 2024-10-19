import { expect } from "@playwright/test";
import { outputDate } from "../helpers/e2e";
import {
  consultBasicData,
  ConsultFieldsConfigType,
  fullTest
} from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "consult_other",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    Side: "radio",
    Pain: "radio",
    Walk: "select"
  }
});

ctx.testRead({
  patientEntryOrder: "2000-001",
  patientId: 1,
  fileId: 1,
  data: {
    Date: "2007-01-10",
    Examiner: "Ershad",
    "Weight (kg)": "29",
    "Weight sd": "0.0",
    "Height (cm)": "134",
    "Height sd": "0.0",
    "Weight/Height ratio": "0.2",
    "Weight/Height sd": "'value' is out-of-bounds: 134 [80 -> 120]",
    BMI: "16.2",
    "BMI sd": "-0.0",
    "Joints or Bones Affected": "PBVE"
  }
});

ctx.testCreateDelete({
  patientEntryOrder: "2010-004",
  patientId: 104,
  deleteTest: (page) =>
    expect(page.getByText(outputDate("2022-10-04"))).toHaveCount(0),
  data: {
    ...consultBasicData,

    Side: "Left",
    "Joints or Bones Affected": "some there",
    Deformity: "",
    "Articulation Mobility": "quiet mobile",
    "Muscle Strength": "strong!",
    Pain: "Moderate"
  }
});

ctx.testUpdate({
  patientEntryOrder: "2010-004",
  patientId: 104,
  fileId: 104,
  dataInitial: {
    ...consultBasicData,

    Side: "Left",
    "Joints or Bones Affected": "some there",
    Deformity: "",
    "Articulation Mobility": "quiet mobile",
    "Muscle Strength": "strong!",
    Pain: "Moderate"
  },
  dataUpdated: {
    ...consultBasicData,
    Side: "Right",
    "Joints or Bones Affected": "some others",
    Deformity: "yes indeed",
    "Articulation Mobility": "not anymore",
    "Muscle Strength": "waw",
    Pain: "No"
  }
});
