import { Page } from "playwright-core";
import { expect } from "playwright/test";
import { CRUD } from "../../../src/constants";
import { crApi, crInit } from "../helpers/cr";
import { E2EFilePanel } from "../helpers/e2e-file-panel";
export { crInit, crLegacyInput, outputDate } from "../helpers/cr";

// export function crApiPatientDelete(
//   page: Page,
//   entry_year: number,
//   entry_order: number
// ): Promise<void> {
//   return crApi(page, `/reference/${entry_year}/${entry_order}`)
//     .then(
//       (folder) =>
//         folder?.id > 0
//           ? crApi(page, `/fiche/patients/${folder.id}`, { method: CRUD.delete })
//           : undefined,
//       () => {
//         // If the file is not found, it's ok
//       }
//     )
//     .then(() => undefined);
// }

export class E2EPatient {
  private isInit = false;
  public id: string;

  constructor(
    public page: Page,
    id: string | number
  ) {
    this.id = "" + id;
  }

  getFile(type: string, fileId?: string | number): E2EFilePanel {
    return new E2EFilePanel(this, type, "" + fileId);
  }

  async go() {
    await crInit(this.page, {
      page: `/folder/${this.id}/summary/`
    });
    const panel = await this.page.getByTestId(`folder-${this.id}`);
    await expect(panel).toBeVisible();
  }

  static apiDelete(
    page: Page,
    entry_year: number,
    entry_order: number
  ): Promise<void> {
    return crApi(page, `/reference/${entry_year}/${entry_order}`)
      .then(
        (folder) =>
          folder?.id > 0
            ? crApi(page, `/fiche/patients/${folder.id}`, {
                method: CRUD.delete
              })
            : undefined,
        () => {
          // If the file is not found, it's ok
        }
      )
      .then(() => undefined);
  }
}
