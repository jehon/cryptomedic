import {
  consultBasicData,
  ConsultFieldsConfigType,
  fullTest
} from "../helpers/e2e-file-panel";

const ctx = fullTest({
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
  patientId: 1,
  fileId: 13,
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
  patientId: 105,
  data: {
    ...consultBasicData
  }
});

ctx.testUpdate({
  patientId: 105,
  fileId: 105,
  dataInitial: {
    ...consultBasicData
  },
  dataUpdated: {
    ...consultBasicData
  }
});
