import { Page } from "playwright-core";
import { expect } from "playwright/test";
import { LOGINS, crApi, crInit } from "../helpers/cr";
export { crInit, crLegacyInput, outputDate } from "../helpers/cr";

export async function crPatientInit(
  page: Page,
  patient_id: string,
  segment: string = "",
  { login = LOGINS.PHYSIO }: { login?: string } = {}
): Promise<void> {
  await crInit(page, {
    page: `/folder/${patient_id}/summary/` + segment,
    login: login
  });
  await expect(page.getByTestId(`folder-${patient_id}`)).toBeVisible();
}

export async function crPatientFile(
  page: Page,
  patient_id: string | number,
  uuid: string = `patient.${patient_id}`
) {
  await crPatientInit(page, "" + patient_id, uuid);
  const panel = await page.getByTestId(uuid);
  const form = await page.getByTestId(`file-${uuid}-form`);
  await expect(form).toBeVisible();

  const getIOContent = (label: string) =>
    form.locator(`[data-role='${label}']`);

  return {
    panel,
    form,
    /**
     * If value is not defined, it is expected to be empty and invisible
     */
    async expectFieldValue(label: string, value?: string | number) {
      const io = await getIOContent(label);

      if (value) {
        await expect(io).toBeVisible();

        const ioc = io.locator(".content");
        await expect(ioc).toBeVisible();
        await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
      } else {
        await expect(io).not.toBeVisible();
      }
    },
    async setFieldValue(_field: string, _value: string) {}
  };
}

export function crApiPatientDelete(
  page: Page,
  entry_year: number,
  entry_order: number
): Promise<void> {
  return crApi(page, `reference/${entry_year}/${entry_order}`).then(
    (folder) =>
      folder?.id > 0
        ? crApi(page, `fiche/patients/${folder.id}`, { method: "delete" })
        : true,
    () => {
      // If the file is not found, it's ok
    }
  );
}
