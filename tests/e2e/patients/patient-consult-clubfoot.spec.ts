import { ConsultFieldsConfigType, fullTest } from "../helpers/e2e-file-panel";

const ctx = fullTest({
  fileType: "consult_clubfoot",
  fieldsConfig: {
    ...ConsultFieldsConfigType,
    "Jumping One Leg Right": "radio",
    "Jumping One Leg Left": "radio",
    "Run Left": "radio"
  }
});

ctx.testRead({
  patientEntryOrder: "2014-105",
  patientId: 5,
  fileId: 1,
  data: {
    Date: "2015-01-10",
    Examiner: "Ershad",
    "Age at consultation time": "2Y",
    "Adduction Angle Right": 0,
    "Dorsal Flexion Max Left": 0
  }
});

// ctx.testCreateDelete({
//   patientId: 106,
//   data: {
//     ...consultBasicData,
//     "Plantar Flexion Max Right": 15,
//     "Jumping One Leg Right": "1",
//     "Jumping One Leg Left": "2",
//     "Run Left": "0"
//   }
// });

// ctx.testUpdate({
//   patientEntryOrder: "2010-06",
//   patientId: 106,
//   fileId: 106,
//   dataInitial: {
//     ...consultBasicData,
//     "Jumping One Leg Right": 1,
//     "Jumping One Leg Left": 2,
//     "Run Left": 0
//   },
//   dataUpdated: {
//     ...consultBasicData,
//     "Jumping One Leg Right": 0,
//     "Jumping One Leg Left": 1,
//     "Run Left": 2
//   }
// });
