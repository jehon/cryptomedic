import { Page } from "playwright-core";
import { expect } from "playwright/test";
import { LOGINS, crInit } from "../helpers/cr";

export { crInit } from "../helpers/cr";

export async function crPatientInit(
  page: Page,
  segment: string,
  { login = LOGINS.PHYSIO }: { login?: string } = {}
) {
  return crInit(page, { page: segment, login: login });
}

export async function crPatientFile(
  page: Page,
  patient_id: string | number,
  uuid: string = `patient.${patient_id}`
  //   only: boolean = true
) {
  await crPatientInit(page, `/patients/${patient_id}#${uuid}`);
  await expect(page.getByTestId(`${uuid}-open`)).toBeVisible();

  const content = page.getByTestId(`${uuid}-content`);
  await expect(content).toBeVisible();

  const getIOContent = async (label: string) => {
    return content.locator(`[label='${label}']`);
  };

  return {
    /**
     * If value is not defined, it is expected to be empty and invisible
     */
    async expectFieldValue(label: string, value?: string | number) {
      const io = await getIOContent(label);

      if (value) {
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
