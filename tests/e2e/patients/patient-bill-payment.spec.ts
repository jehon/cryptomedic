import { expect, test } from "@playwright/test";
import { startCryptomedic } from "../helpers/e2e";
import { E2EIOPanel } from "../helpers/e2e-io-panel";

const totalPaymentsLabel = "Payments Received (see below)";

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
  const patientId = await cryptomedic.apiCreatePatient();
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
  await billPanel.expectOutputValue(totalPaymentsLabel, "0.0");

  // API Add payment, check total
  await cryptomedic.apiCrudCreate(`/fiche/payment`, {
    bill_id: billId,
    amount: 100
  });

  await cryptomedic.page.reload();
  await expect(paymentPanel).toBeVisible();
  await billPanel.expectOutputValue(totalPaymentsLabel, "100.0");

  // GUI payment crud
});
