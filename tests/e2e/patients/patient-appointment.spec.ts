import { expect, test } from "@playwright/test";
import { escapeRegExp } from "../../../src/utils/strings";
import { crApiLogin, crExpectUrl } from "../helpers/cr";
import { crApiFileUpdate, crPatientFile, outputDate } from "./cr-patients";

// See 320 test appointment.sql for data

test("2000-001.appointment.2", async ({ page }) => {
  await crApiLogin(page);
  const panel = await crPatientFile(page, 1, "appointment.2");
  await panel.expectFieldValue("Date", outputDate("2015-04-28"));
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2010-001 create and delete appointment", async ({ page }) => {
  await crApiLogin(page);

  // TODO: Click on stuff
  const panel = await crPatientFile(page, 102, "appointment.add");

  // Add
  await crExpectUrl(
    page,
    new RegExp(".*" + escapeRegExp("#/folder/102/summary/appointment.") + "add")
  );

  // Add: Not acceptable form...
  await panel.panel.getByText("Save").click();
  await expect(panel.panel.getByText("Edit")).not.toBeVisible();

  await panel.setFieldValue("Date", "2022-05-06");
  await panel.doSave();
  await panel.goEdit();
  await panel.doDelete();
  await crExpectUrl(
    page,
    new RegExp(".*" + escapeRegExp("#/folder/102/summary"))
  );
  await expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0);
});

test("2010-001 update appointment", async ({ page }) => {
  await crApiLogin(page);

  // Load
  await crApiFileUpdate(page, "appointments", {
    id: 101,
    center: "",
    date: "2024-01-02",
    purpose: "test data"
  });
  const panel = await crPatientFile(page, 102, "appointment.101");
  await crExpectUrl(
    page,
    new RegExp(
      ".*" + escapeRegExp("#/folder/102/summary/appointment.") + "[0-9]+"
    )
  );

  await panel.expectFieldValue("Date", outputDate("2024-01-02"));
  await panel.expectFieldValue("Center");
  await panel.expectFieldValue("Purpose", "test data");

  await panel.goEdit();
  await panel.setFieldValue("Date", "2024-10-11");
  await panel.setFieldValue("Center", "Chakaria Disability Center", "select");
  await panel.setFieldValue("Purpose", "test running", "textarea");
  await expect(panel.panel).toHaveScreenshot();

  await panel.doSave();
  await expect(panel.panel).toHaveScreenshot();
  await panel.expectFieldValue("Date", outputDate("2024-10-11"));
  await panel.expectFieldValue("Center", "Chakaria Disability Center");
  await panel.expectFieldValue("Purpose", "test running");
});
