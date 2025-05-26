import {
  patientRelatedFullTest,
  TimedFieldsConfigType
} from "../helpers/e2e-patient-related-full-test";

const ctx = patientRelatedFullTest({
  fileType: "appointment",
  fieldsConfig: {
    ...TimedFieldsConfigType,
    Purpose: "textarea"
  },
  doAddButton: async (page) => {
    await page.getByTestId("add").click();
    await page.getByTestId("add-appointment").click();
  }
});

ctx.testRead({
  parentUrl: "/patient/1",
  fileId: "2",
  data: {
    Date: "2015-04-28"
  }
});

ctx.testCreateDelete({
  parentUrl: "/patient/102",
  data: {
    Date: "2022-05-06"
  }
});

ctx.testUpdate({
  parentUrl: "/patient/102",
  fileId: "102",
  dataInitial: {
    Date: "2024-01-02",
    Center: undefined,
    Purpose: "test data"
  },
  dataUpdated: {
    Date: "2024-10-11",
    Center: "Chakaria Disability Center",
    Purpose: "test running"
  }
});
