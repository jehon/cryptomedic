import {
  patientRelatedFullTest,
  TimedFieldsConfigType
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "surgery",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Diagnostic: {
      json: "report_diagnostic"
    },
    Surgeon: {
      json: "report_surgeon"
    },
    "Side Right": {
      type: "checkbox",
      json: "report_side_right"
    },
    "Side Left": {
      type: "checkbox",
      json: "report_side_left"
    },
    Procedure: {
      json: "report_procedure"
    },
    "Follow-Up Complications": {
      type: "textarea",
      json: "follow_up_complication"
    }
  },
  doAddButton: async (page) => {
    await page.getByTestId("add").click();
    await page.getByTestId("add-surgery").click();
  }
});

ctx.testRead({
  parentUrl: "/patient/1",
  fileId: "5",
  data: {
    Date: "2014-01-02",
    Diagnostic: "test",
    "Follow-Up Complications": "nothing"
  }
});

ctx.testCreateDelete({
  parentUrl: "/patient/103",
  initialIsAlreadyGood: true,
  data: {
    Date: "2008-08-10",
    Surgeon: "Surgeon says that..."
  }
});

ctx.testUpdate({
  parentUrl: "/patient/103",
  fileId: "103",
  dataInitial: {
    Date: "2008-08-20",
    Diagnostic: "cool",
    Surgeon: "god",
    "Side Left": undefined,
    "Side Right": true,
    Procedure: "could run again",
    "Follow-Up Complications": "but fall from a wall"
  },
  dataUpdated: {
    Date: "2008-08-21",
    Diagnostic: "nice",
    Surgeon: "el diabolo",
    "Side Right": false,
    "Side Left": true,
    Procedure: "can sleep correctly",
    "Follow-Up Complications": "could not say it is best"
  }
});
