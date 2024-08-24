import { expect, test } from "@playwright/test";
import { crApiLogin } from "../helpers/cr";
import { crApiFileUpdate, crPatientFile, outputDate } from "./cr-patients";

// See 320 test appointment.sql for data

test("read 2001-001.appointment.2", async ({ page }) => {
  await crApiLogin(page);
  const panel = await crPatientFile(page, 1, "appointment.2");
  await panel.expectFieldValue("Date", outputDate("2015-04-28"));
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2010-001 create and delete appointment", async ({ page }) => {
  await crApiLogin(page);

  // TODO: this is not exactly what users do
  const panel = await crPatientFile(page, 102, "appointment.add");
  await expect(panel.panel).toBeVisible();

  // Not acceptable form...
  await panel.panel.getByText("Save").click();
  await expect(panel.panel.getByText("Edit")).not.toBeVisible();

  await panel.setFieldValue("Date", "2022-05-06");
  await panel.panel.getByText("Save").click();
  await expect(page.getByText("Edit")).toBeVisible();
  await page.getByText("Edit").click();
  await page.getByText("Delete").click();

  // Wait for the popup
  const popup = page.getByTestId("popup");
  await expect(popup).toBeVisible();
  const popupActions = popup.getByRole("group");
  await expect(popupActions).toBeVisible();
  await expect(popupActions.getByText("Cancel")).toBeVisible();
  await expect(popupActions.getByText("Delete")).toBeVisible();
  await popupActions.getByText("Delete").click();
  await expect(page.getByText(outputDate("2022-05-06"))).toHaveCount(0);
});

test("2010-001 update appointment", async ({ page }) => {
  await crApiLogin(page);

  await crApiFileUpdate(page, "appointments", {
    id: 101,
    center: "",
    date: "2024-01-02",
    purpose: "test data"
  });
  const panel = await crPatientFile(page, 102, "appointment.101");
  await panel.expectFieldValue("Date", outputDate("2024-01-02"));
  await panel.expectFieldValue("Center");
  await panel.expectFieldValue("Purpose", "test data");

  await panel.panel.getByText("Edit").click();
  await expect(panel.panel.getByText("Save")).toBeVisible();

  await panel.setFieldValue("Date", "2024-10-11");
  await panel.setFieldValue("Center", "Chakaria Disability Center", "select");
  await panel.setFieldValue("Purpose", "test running", "textarea");
  await expect(panel.panel).toHaveScreenshot();

  await panel.panel.getByText("Save").click();
  await expect(panel.panel.getByText("Edit")).toBeVisible();

  await expect(panel.panel).toHaveScreenshot();
  await panel.expectFieldValue("Date", outputDate("2024-10-11"));
  await panel.expectFieldValue("Center", "Chakaria Disability Center");
  await panel.expectFieldValue("Purpose", "test running");
});
