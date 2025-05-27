import { expect, test } from "@playwright/test";
import { startCryptomedic } from "../helpers/e2e";
import { E2EIOPanel } from "../helpers/e2e-io-panel";

const entryYear = "2024";

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

test("bill.payment", async ({ page }) => {
  const cryptomedic = startCryptomedic(page);
  await cryptomedic.apiLogin();
  const patientId = await cryptomedic.apiCreatePatient({
    entry_year: entryYear
  });
  const billId = await cryptomedic.apiCrudCreate(`/fiche/bill`, {
    patient_id: patientId,
    price_id: 1,
    examiner: "Ershad"
  });

  await cryptomedic.goTo(`/patient/${patientId}/bill/${billId}`);
  const billPanel = new E2EIOPanel(
    cryptomedic.page.getByTestId(`bill.${billId}`),
    {}
  );
  await billPanel.doOpen();
  const paymentPanel = await cryptomedic.page.getByTestId(
    `bill.${billId}.payments`
  );
  await expect(paymentPanel).toBeVisible();
});
