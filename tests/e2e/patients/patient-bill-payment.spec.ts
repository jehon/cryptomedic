import { expect, test } from "@playwright/test";
import { startCryptomedic } from "../helpers/e2e";
import { E2EIOPanel } from "../helpers/e2e-io-panel";

// TODO: normalize fieldsConfig here
test("2014-103.bill.2", async ({ page }) => {
  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();
  await cryptomedic.goTo(`/patient/3/bill/2`);

  const e2eIOPanel = new E2EIOPanel(cryptomedic.page.getByTestId(`bill.2`), {});

  await e2eIOPanel.expectOutputValue("Family Salary", 4500);
  const paymentPanel = await page.getByTestId("bill.2.payments");
  await expect(paymentPanel).toBeVisible();
  const payment2 = paymentPanel.getByTestId("payment.2");
  await expect(payment2).toBeVisible();
});
