import {
  consultBasicData,
  ConsultFieldsConfigType,
  patientRelatedFullTest
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "consult_clubfoot",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    "Jumping One Leg Right": "radio",
    "Jumping One Leg Left": "radio",
    "Run Left": "radio"
  }
});

ctx.testRead({
  patientId: "5",
  fileId: "1",
  data: {
    Date: "2015-01-10",
    Examiner: "Ershad",
    "Age at consultation time": "2Y",
    "Adduction Angle Right": undefined,
    "Dorsal Flexion Max Left": undefined
  }
});

ctx.testCreateDelete({
  patientId: "106",
  data: {
    ...consultBasicData,
    Date: "2008-04-10",
    "Plantar Flexion Max Right": 15,
    "Jumping One Leg Right": 1,
    "Jumping One Leg Left": 2,
    "Run Left": 0
  }
});

ctx.testUpdate({
  patientId: "106",
  fileId: "106",
  dataInitial: {
    ...consultBasicData,
    Date: "2008-04-20",
    "Jumping One Leg Right": 1,
    "Jumping One Leg Left": 2,
    "Run Left": 0
  },
  dataUpdated: {
    ...consultBasicData,
    Date: "2008-04-21",
    "Jumping One Leg Right": 0,
    "Jumping One Leg Left": 1,
    "Run Left": 2
  }
});
