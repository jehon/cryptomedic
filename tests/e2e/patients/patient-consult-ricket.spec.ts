import {
  consultBasicData,
  ConsultFieldsConfigType,
  patientRelatedFullTest
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "consult_ricket",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    "Walking Difficulties": "select",
    Pain: "radio",
    "Wrist Enlargement": "select",
    "Rib Heading": "select",

    "Right Leg": "radio",
    "Left Leg": "radio"
  }
});

ctx.testRead({
  parentUrl: "/patient/1",
  fileId: "13",
  data: {
    Date: "2014-01-04",
    Examiner: "AMD doctor",
    "Weight (kg)": 37,
    "Walking Difficulties": "Level 1",
    Pain: "Moderate",
    "Right Leg": "Varus",
    "Left Leg Angle": 5,
    "Suggested for Surgery": true
  }
});

ctx.testCreateDelete({
  parentUrl: "/patient/105",
  data: {
    ...consultBasicData,
    Date: "2008-06-10"
  }
});

ctx.testUpdate({
  parentUrl: "/patient/105",
  fileId: "105",
  dataInitial: {
    ...consultBasicData,
    Date: "2008-06-20"
  },
  dataUpdated: {
    ...consultBasicData,
    Date: "2008-06-21"
  }
});
