import { expect, type Page } from "@playwright/test";
import type { IndexSignature } from "../../../src/types";
import { CRUD, type CRUDType } from "../../../src/utils/network";
import { passThrough } from "../../../src/utils/promises";
export { outputDate } from "../../../src/utils/date";

// https://playwright.dev/docs/test-fixtures#box-fixtures ??
// let testIndex = 0;
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// test.beforeEach("dump browser", ({ page }, workerInfo) => {
//   const projectName = workerInfo.project.name;
//   const projectIndex = {
//     Chrome: 0,
//     Mobile: 1
//   }[workerInfo.project.name];
//   console.log({ projectName, projectIndex });
//   testIndex = projectIndex;
// });

const backendHost = `http://${process.env["CRYPTOMEDIC_DEV_HTTP_HOST"] ?? "localhost"}:${process.env["CRYPTOMEDIC_DEV_HTTP_PORT"] ?? 8085}`;

const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

const PASSWORD = "p";

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

  static readonly webBase = `${backendHost}/built/frontend/ng1x.html?dev#`;

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
      timeout: 5000
    });
    await this.waitReady();
  }

  async waitForPathByRegex(url: RegExp) {
    await this.page.waitForURL(url, { timeout: 5000 });
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

  detectId(title: string) {
    const url = this.page.url();
    const matches = /\/(?<id>[0-9]+)$/.exec(url);
    const id = matches?.groups?.["id"] ?? "";
    console.info(`Detected id ${title}: ${id}`);
    return id;
  }

  // *********************************************
  //
  // API
  //
  // *********************************************

  api(
    url: string,
    options: {
      method?: CRUDType;
      data?: any;
    } = {}
  ): Promise<any> {
    const requestor = this.page.request as IndexSignature<any>;
    const absoluteApiUrl = `${backendHost}/api${url}`;

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

  async apiLogin(login = LOGINS.PHYSIO): Promise<void> {
    await this.api("/auth/mylogin", {
      method: CRUD.submit,
      data: {
        username: login,
        password: PASSWORD
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
}

export function startCryptomedic(page: Page): E2ECryptomedic {
  return new E2ECryptomedic(page);
}
