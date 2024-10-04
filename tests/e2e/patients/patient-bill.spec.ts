import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import { E2EPatient } from "./e2e-patients";

test("2000-001.bill.1", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1).getFile("bill", 1).go();

  await e2eFile.expectOutputValue("Date", outputDate("2011-06-09"));
  await e2eFile.expectOutputValue("Consult CDC Consultation Physio", "1");
  await e2eFile.expectOutputValue("Consult Other");
  await e2eFile.expectOutputValue("Price asked", 6720);
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});

test("2014-103.bill.2", async ({ page }) => {
  await crApiLogin(page);

  const e2eFile = await new E2EPatient(page, 3).getFile("bill", 2).go();

  await e2eFile.expectOutputValue("Family Salary", 4500);
  const paymentPanel = await page.getByTestId("bill.2.payments");
  await expect(paymentPanel).toBeVisible();
  const payment2 = paymentPanel.getByTestId("payment.2");
  await expect(payment2).toBeVisible();
  await expect(payment2.getByText("Second payment")).toBeVisible();
});
