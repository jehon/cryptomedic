import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

test("2000-001.bill.1", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 1, "bill.1");
  await panel.expectFieldValue("Date", outputDate("2011-06-09"));
  await panel.expectFieldValue("Consult CDC Consultation Physio", "1");
  await panel.expectFieldValue("Consult Other");
  await panel.expectFieldValue("Price asked", 6720);
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});

test("2014-103.bill.2", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 3, "bill.2");
  await panel.expectFieldValue("Family Salary", 4500);
  const paymentPanel = await page.getByTestId("bill.2.payments");
  await expect(paymentPanel).toBeVisible();
  const payment2 = paymentPanel.getByTestId("payment.2");
  await expect(payment2).toBeVisible();
  await expect(payment2.getByText("Second payment")).toBeVisible();
});
