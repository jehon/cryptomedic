import {
  patientRelatedFulllTest,
  TimedFieldsConfigType
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFulllTest({
  fileType: "bill",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Examiner: "select", // Not mandatory, so one more -> not a radio anymore
    "Family Salary": { json: "sl_family_salary", type: "string" },
    "Number of Household Members": {
      json: "sl_number_of_household_members",
      type: "string"
    }
  }
});

// Data in DB are obsolete, but they are calculated live
ctx.testRead({
  patientId: "1",
  fileId: "1",
  data: {
    Date: "2011-06-09",
    "Family Salary": 3000,
    "Number of Household Members": 7,
    Percentage: 10,
    "Price asked": 2240,
    "Consult CDC Consultation Physio": 1,
    "Consult Other": undefined
  }
});

ctx.testCreateDelete({
  patientId: "108",
  data: {
    Date: "2008-02-10",
    Examiner: "Ershad",
    Center: "Ramu",
    "Family Salary": "2000",
    "Number of Household Members": "5"
  },
  initialIsAlreadyGood: true
});

ctx.testUpdate({
  patientId: "108",
  fileId: "108",
  dataInitial: {
    Date: "2008-02-20",
    Center: "Ramu"
  },
  dataUpdated: {
    Date: "2008-02-21",
    Center: "Chakaria Disability Center"
  }
});
