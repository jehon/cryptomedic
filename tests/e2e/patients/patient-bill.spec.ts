import { fullTest, TimedFieldsConfigType } from "../helpers/e2e-file-panel";

const ctx = fullTest({
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
  patientId: 1,
  fileId: 1,
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
