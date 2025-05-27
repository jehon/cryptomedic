import { expect, test } from "@playwright/test";
import { startCryptomedic } from "../helpers/e2e";
import { E2EPatient } from "../helpers/e2e-patients";

const entryYear = "2024";
const totalPaymentsLabel = "Payments Received (see below)";

test("2014-103.bill.2", async ({ page }) => {
  const cryptomedic = await startCryptomedic(page);
  await cryptomedic.apiLogin();

  const e2eFile = await new E2EPatient(page, 3)
    .getFile({ fileType: "bill", fileId: 2, fieldsConfig: {} })
    .go();

  await e2eFile.expectOutputValue("Family Salary", 4500);
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
