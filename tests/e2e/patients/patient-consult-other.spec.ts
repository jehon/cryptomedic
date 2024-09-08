import { expect, test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { crPatientFile } from "./cr-patients";

test("2000-001.consult-other.1", async ({ page }) => {
  await crApiLogin(page);

  const panel = await crPatientFile(page, 1, "consult_other.1");
  await panel.expectFieldValue("Date", outputDate("2007-01-10"));
  await panel.expectFieldValue("Examiner", "Ershad");

  await panel.expectFieldValue("Weight (kg)", "29");
  await panel.expectFieldValue("Weight sd", "0.0");

  await panel.expectFieldValue("Height (cm)", "134");
  await panel.expectFieldValue("Height sd", "0.0");

  await panel.expectFieldValue("Weight/Height ratio", "0.2");
  await panel.expectFieldValue(
    "Weight/Height sd",
    "'value' is out-of-bounds: 134 [80 -> 120]"
  );
  await panel.expectFieldValue("BMI", "16.2");
  await panel.expectFieldValue("BMI sd", "-0.0");

  await panel.expectFieldValue("Joints or Bones Affected", "PBVE");
  await expect(panel.form).toHaveScreenshot();
  await expect(panel.panel).toHaveScreenshot();
});
