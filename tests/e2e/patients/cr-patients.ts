import { Locator, Page } from "playwright-core";
import { expect } from "playwright/test";
import { CRUD, JsonData } from "../../../src/constants";
import { crApi, crInit } from "../helpers/cr";
import { crFile } from "../helpers/cr-file-panel";
export { crInit, crLegacyInput, outputDate } from "../helpers/cr";

export async function crPatientInit(
  page: Page,
  patient_id: string,
  segment: string = ""
): Promise<Locator> {
  await crInit(page, {
    page: `/folder/${patient_id}/summary/` + segment
  });
  const panel = page.getByTestId(`folder-${patient_id}`);
  await expect(panel).toBeVisible();
  return panel;
}

export async function crPatientFile(
  page: Page,
  patient_id: string | number,
  uuid: string = `patient.${patient_id}`
) {
  await crPatientInit(page, "" + patient_id, uuid);
  return crFile(page, uuid);
}

export function crApiFileUpdate(
  page: Page,
  route: string,
  data: any
): Promise<JsonData> {
  // ? optimistic locking ?
  // const initData = await crApi(page, `/fiche/${route}/${data.id}`);
  // data["updated_at"] = initData["updated_at"];

  return crApi(page, `/fiche/${route}/${data.id}`, {
    method: CRUD.update,
    data
  });
}

export function crApiPatientDelete(
  page: Page,
  entry_year: number,
  entry_order: number
): Promise<void> {
  return crApi(page, `/reference/${entry_year}/${entry_order}`)
    .then(
      (folder) =>
        folder?.id > 0
          ? crApi(page, `/fiche/patients/${folder.id}`, { method: CRUD.delete })
          : undefined,
      () => {
        // If the file is not found, it's ok
      }
    )
    .then(() => undefined);
}
