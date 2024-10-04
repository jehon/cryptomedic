import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/e2e";
import { E2EPatient } from "./e2e-patients";

test("2000-001.consult-other.1", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1)
    .getFile("consult_other", 1)
    .go();

  await e2eFile.expectOutputValue("Date", outputDate("2007-01-10"));
  await e2eFile.expectOutputValue("Examiner", "Ershad");

  await e2eFile.expectOutputValue("Weight (kg)", "29");
  await e2eFile.expectOutputValue("Weight sd", "0.0");

  await e2eFile.expectOutputValue("Height (cm)", "134");
  await e2eFile.expectOutputValue("Height sd", "0.0");

  await e2eFile.expectOutputValue("Weight/Height ratio", "0.2");
  await e2eFile.expectOutputValue(
    "Weight/Height sd",
    "'value' is out-of-bounds: 134 [80 -> 120]"
  );
  await e2eFile.expectOutputValue("BMI", "16.2");
  await e2eFile.expectOutputValue("BMI sd", "-0.0");

  await e2eFile.expectOutputValue("Joints or Bones Affected", "PBVE");
  await expect(e2eFile.form).toHaveScreenshot();
  await expect(e2eFile.panel).toHaveScreenshot();
});
