import { expect, type Locator, type Page } from "@playwright/test";
import type { IndexSignature } from "../../../src/types";
import { CRUD, type CRUDType } from "../../../src/utils/network";
import { passThrough } from "../../../src/utils/promises";
export { outputDate } from "../../../src/utils/date";

export const WebBaseUrl = `http://${process.env["CRYPTOMEDIC_DEV_HTTP_HOST"] ?? "localhost"}:${process.env["CRYPTOMEDIC_DEV_HTTP_PORT"] ?? 8085}`;

const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

const PASSWORD = "p";

export function crUrl(segment: string = ""): string {
  return `${WebBaseUrl}/built/frontend/ng1x.html?dev#${segment}`;
}

// export function crDebugHooks(page: Page): void {
//   // Listen for all console logs
//   // page.on("console", (msg) =>
//   //   console.info("Error from browser: ", { type: msg.type(), text: msg.text() })
//   // );

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

//   page.on("pageerror", (err) =>
//     console.warn("thrown error from browser: ", err)
//   );
// }

export async function crExpectUrl(page: Page, r: string | RegExp) {
  await page.waitForURL(r, { timeout: 5000 });
  await expect(page).toHaveURL(r);
}

export async function crAcceptPopup(page: Page | Locator, button: string) {
  const box = page.locator(".popup .box .buttons.btn-group");
  await expect(page.locator(".popup .box .buttons.btn-group")).toBeVisible();
  await box.getByText(button).click();

  await expect(box).not.toBeVisible();
}

// ************************************
//
// Big object for the application
//
// ************************************

export class E2ECryptomedic {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  api(
    url: string,
    options: {
      method?: CRUDType;
      data?: any;
    } = {}
  ): Promise<any> {
    //
    // https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-post
    //
    // Return the response object (json)
    //

    const requestor = this.page.request as IndexSignature<any>;
    const absoluteApiUrl = `${WebBaseUrl}/api${url}`;

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

  async goTo(path: string): Promise<void> {
    const absolutePath = `${WebBaseUrl}/built/frontend/ng1x.html?dev#${path}`;

    await this.page.goto(absolutePath);
    await this.waitReady();
  }

  async waitReady() {
    await expect(this.page, `url: ${WebBaseUrl}`).toHaveTitle(/Cryptomedic/);
    await expect(this.page.getByTestId("top-level")).toBeVisible();
    await this.page.evaluate(() => document.fonts.ready);
    await expect(this.page.getByTestId("global-wait"), "crReady").toHaveCount(
      0
    );
  }
}

export function startCryptomedic(page: Page): E2ECryptomedic {
  return new E2ECryptomedic(page);
}
