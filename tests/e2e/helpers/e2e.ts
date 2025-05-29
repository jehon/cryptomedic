import { expect, type Page } from "@playwright/test";
import type { IndexSignature } from "../../../src/types";
import { CRUD, type CRUDType } from "../../../src/utils/network";
import { passThrough } from "../../../src/utils/promises";
import { escapeRegExp } from "../../../src/utils/strings";
import {
  e2eBackendHost,
  e2eDefaultYear,
  e2eUsers,
  e2eUsersPassword,
  e2eWaitForPathChangeMs
} from "./e2e-config";
export { outputDate } from "../../../src/utils/date";

// export function crDebugHooks(page: Page): void {
//   // Listen for all console logs
//   // page.on("console", (msg) =>
//   //   console.info("Error from browser: ", { type: msg.type(), text: msg.text() })
//   // );
//
//   page.on("console", async (msg) => {
//     const msgArgs = msg.args();
//     const logValues = await Promise.all(
//       msgArgs.map(async (arg) => await arg.jsonValue())
//     );
//     console.warn(
//       "Error from browser: ",
//       JSON.stringify(
//         { type: msg.type(), text: msg.text(), logs: logValues },
//         null,
//         2
//       )
//     );
//   });
//
//   page.on("pageerror", (err) =>
//     console.warn("thrown error from browser: ", err)
//   );
// }

export type E2ECryptomedicType = InstanceType<typeof E2ECryptomedic>;
class E2ECryptomedic {
  readonly page: Page;

  static readonly webBase = `${e2eBackendHost}/built/frontend/ng1x.html?dev#`;

  constructor(page: Page) {
    this.page = page;
  }

  // *********************************************
  //
  // GUI
  //
  // *********************************************

  async acceptPopup(button: string) {
    const box = this.page.locator(".popup .box .buttons.btn-group");
    await expect(
      this.page.locator(".popup .box .buttons.btn-group")
    ).toBeVisible();
    await box.getByText(button).click();

    await expect(box).not.toBeVisible();
  }

  async goTo(path: string): Promise<void> {
    const absolutePath = `${E2ECryptomedic.webBase}${path}`;

    await this.page.goto(absolutePath);
    await this.waitReady();
  }

  async waitForPath(path: string) {
    await this.page.waitForURL(`${E2ECryptomedic.webBase}${path}`, {
      timeout: e2eWaitForPathChangeMs
    });
    await this.waitReady();
  }

  async waitForPathByRegex(url: RegExp) {
    await this.page.waitForURL(url, { timeout: e2eWaitForPathChangeMs });
    await this.waitReady();
  }

  async waitReady() {
    await expect(this.page, `url: ${E2ECryptomedic.webBase}`).toHaveTitle(
      /Cryptomedic/
    );
    await expect(this.page.getByTestId("top-level")).toBeVisible();
    await this.page.evaluate(() => document.fonts.ready);
    await expect(this.page.getByTestId("global-wait"), "crReady").toHaveCount(
      0
    );
  }

  detectId(title: string, options: { ending?: string } = {}) {
    const url = this.page.url();
    const regex = new RegExp(
      `\\/(?<id>[0-9]+)(?<edit>${escapeRegExp(options.ending ?? "")})$`
    );
    const matches = regex.exec(url);
    const id = matches?.groups?.["id"] ?? "";
    if (isNaN(parseInt(id))) {
      console.error(`Detected id ${title}: `, { url, matches, id });
      throw new Error(`Could not detect id from URL: ${url}.`);
    }
    console.info(`Detected id ${title}: ${id}`);
    return id;
  }

  // *********************************************
  //
  // API
  //
  // *********************************************

  api<T = any>(
    url: string,
    options: {
      method?: CRUDType;
      data?: any;
    } = {}
  ): Promise<T> {
    const requestor = this.page.request as IndexSignature<any>;
    const absoluteApiUrl = `${e2eBackendHost}/api${url}`;

    return requestor[(options.method ?? CRUD.read).toLowerCase()](
      absoluteApiUrl,
      {
        data: options.data ?? {}
      }
    )
      .then(
        passThrough<any>((resp) => {
          if (resp.status() != 200) {
            throw new Error(
              "Server responded with invalid status: " + resp.status()
            );
          }
        })
      )
      .then((resp: any) => resp.json());
  }

  async apiLogin(login = e2eUsers.PHYSIO): Promise<void> {
    await this.api("/auth/mylogin", {
      method: CRUD.submit,
      data: {
        username: login,
        password: e2eUsersPassword
      }
    });
  }

  async apiCrudDelete(path: string, id: string) {
    await this.api(`/api/${path}/${id}`, {
      method: CRUD.delete
    });
  }

  async apiCrudReset(
    path: string,
    id: string,
    data: Record<string, string | number | boolean | null>
  ): Promise<void> {
    await this.api(`/${path}/${id}`, {
      method: CRUD.update,
      data
    });
  }

  async apiCrudCreate(
    path: string,
    data: Record<string, string | number | boolean | null>
  ): Promise<string> {
    return await this.api(`/${path}`, {
      method: CRUD.create,
      data
    }).then((resp) => resp.newKey);
  }

  async apiCreatePatient(
    data: Record<string, string | number | boolean | null> = {}
  ): Promise<string> {
    return await this.api(`/fiche/patients`, {
      method: CRUD.create,
      data: {
        entry_year: e2eDefaultYear,
        ...data
      }
    }).then((patient) => "" + patient.newKey);
  }
}

export function startCryptomedic(page: Page): E2ECryptomedic {
  return new E2ECryptomedic(page);
}
