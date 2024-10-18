import { expect, test } from "@playwright/test";
import { crApiLogin } from "../helpers/e2e";
import { E2EPatient } from "../helpers/e2e-patients";

// TODO: normalize fieldsConfig here
test("2014-103.bill.2", async ({ page }) => {
  await crApiLogin(page);

  const e2eFile = await new E2EPatient(page, 3)
    .getFile({ fileType: "bill", fileId: 2, fieldsConfig: {} })
    .go();

  await e2eFile.expectOutputValue("Family Salary", 4500);
  const paymentPanel = await page.getByTestId("bill.2.payments");
  await expect(paymentPanel).toBeVisible();
  const payment2 = paymentPanel.getByTestId("payment.2");
  await expect(payment2).toBeVisible();
  await expect(payment2.getByText("Second payment")).toBeVisible();
});
