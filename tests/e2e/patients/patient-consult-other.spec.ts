import {
  consultBasicData,
  ConsultFieldsConfigType,
  patientRelatedFullTest
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "consult_other",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    Side: "radio",
    Pain: "radio",
    Walk: "select",
    "Examination Data": "textarea"
  },
  doAddButton: async (page) => {
    await page.getByTestId("add").click();
    await page.getByTestId("add-consult_other").click();
  }
});

ctx.testRead({
  parentUrl: "/patient/1",
  fileId: "1",
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
  parentUrl: "/patient/104",
  data: {
    ...consultBasicData,
    Date: "2008-05-10",
    Side: "Left",
    "Joints or Bones Affected": "some there",
    Deformity: "",
    "Articulation Mobility": "quiet mobile",
    "Muscle Strength": "strong!",
    Pain: "Moderate"
  }
});

ctx.testUpdate({
  parentUrl: "/patient/104",
  fileId: "104",
  dataInitial: {
    ...consultBasicData,
    Date: "2008-05-20",
    Side: "Left",
    "Joints or Bones Affected": "some there",
    Deformity: "",
    "Articulation Mobility": "quiet mobile",
    "Muscle Strength": "strong!",
    Pain: "Moderate"
  },
  dataUpdated: {
    ...consultBasicData,
    Date: "2008-05-21",
    Side: "Right",
    "Joints or Bones Affected": "some others",
    Deformity: "yes indeed",
    "Articulation Mobility": "not anymore",
    "Muscle Strength": "waw",
    Pain: "No"
  }
});
