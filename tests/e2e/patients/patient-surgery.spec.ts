import { test } from "@playwright/test";
import { crApiLogin, outputDate } from "../helpers/cr";
import { E2EPatient } from "./e2e-patients";

test("2000-001.surgery.5", async ({ page }) => {
  await crApiLogin(page);
  const e2eFile = await new E2EPatient(page, 1).getFile("surgery", 5).go();

  await e2eFile.expectOutputValue("Date", outputDate("2014-01-02"));
  await e2eFile.expectOutputValue("Diagnostic", "test");
  await e2eFile.expectOutputValue("Follow-Up Complications", "nothing");
});
