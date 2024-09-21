import { expect, test } from "@playwright/test";
import { escapeRegExp } from "../../../src/utils/strings";
import { crApiLogin, crExpectUrl } from "../helpers/cr";
import { E2EPatient, outputDate } from "./e2e-patients";

// See 320 test appointment.sql for data

test("2000-001.appointment.2", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1).getFile("appointment", 2).go();

  await e2eFile.expectOutputValue("Date", outputDate("2015-04-28"));
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});

test("2010-001 create and delete appointment", async ({ page }) => {
  await crApiLogin(page);

  const e2ePatient = await new E2EPatient(page, 102).go();
  const panel = await e2ePatient.doAdd("appointment");

  // Add: Not acceptable form...
  await panel.panel.getByText("Save").click();
  await expect(panel.panel.getByText("Edit")).not.toBeVisible();

  await panel.setFieldValue("Date", "2022-05-06");
  await panel.doSave(true);

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

  const e2eFile = new E2EPatient(page, 102).getFile("appointment", 101);
  await e2eFile.apiFileUpdate(101, {
    id: "101",
    center: "",
    date: "2024-01-02",
    purpose: "test data"
  });

  await e2eFile.go();
  await e2eFile.expectOutputValue("Date", outputDate("2024-01-02"));
  await e2eFile.expectOutputValue("Center");
  await e2eFile.expectOutputValue("Purpose", "test data");
  await expect(e2eFile.panel).toHaveScreenshot();

  await e2eFile.goEdit();
  await e2eFile.expectInputValue("Date", "2024-01-02");
  await e2eFile.expectInputValue("Center");
  await e2eFile.expectInputValue("Purpose", "test data");
  await expect(e2eFile.panel).toHaveScreenshot();

  await e2eFile.setFieldValue("Date", "2024-10-11");
  await e2eFile.setFieldValue("Center", "Chakaria Disability Center", "select");
  await e2eFile.setFieldValue("Purpose", "test running", "textarea");
  await expect(e2eFile.panel).toHaveScreenshot();

  await e2eFile.doSave();
  await e2eFile.expectOutputValue("Date", outputDate("2024-10-11"));
  await e2eFile.expectOutputValue("Center", "Chakaria Disability Center");
  await e2eFile.expectOutputValue("Purpose", "test running");
  await expect(e2eFile.panel).toHaveScreenshot();
});
