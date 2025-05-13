import { expect, type Locator, type Page } from "@playwright/test";
import { type IndexSignature } from "../../../src/definitions";
import type { CRUDType } from "../../../src/utils/network";
import { CRUD } from "../../../src/utils/network";
import { passThrough } from "../../../src/utils/promises";
export { outputDate } from "../../../src/utils/date";

const WebBaseUrl = `http://${process.env["CRYPTOMEDIC_DEV_HTTP_HOST"] ?? "localhost"}:${process.env["CRYPTOMEDIC_DEV_HTTP_PORT"] ?? 8085}`;
type JsonData = any;

const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

const PASSWORD = "p";

export function crUrl(segment: string = ""): string {
  return `${WebBaseUrl}/built/frontend/ng1x.html?dev#${segment}`;
}

function crUrlAPI(segment: string = ""): string {
  return `${WebBaseUrl}/api${segment}`;
}

export function crApi(
  page: Page,
  url: string,
  options: {
    method?: CRUDType;
    data?: any;
  } = {}
): Promise<JsonData> {
  //
  // https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-post
  //
  // Return the response object (json)
  //

  // TODO: more precise than any?
  const requestor = page.request as IndexSignature<any>;
  return requestor[(options.method ?? CRUD.read).toLowerCase()](crUrlAPI(url), {
    data: options.data ?? {}
  })
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

export function crApiLogin(
  page: Page,
  login: string = LOGINS.PHYSIO
): Promise<JsonData> {
  return crApi(page, "/auth/mylogin", {
    method: CRUD.submit,
    data: {
      username: login,
      password: PASSWORD
    }
  });
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
//     console.warn("Uncatched error from browser: ", err)
//   );
// }

export async function crInit(
  page: Page,
  opts: {
    page?: string;
  } = {}
): Promise<void> {
  await page.goto(crUrl(opts.page ?? ""));

  // Expect a title "to contain" a substring.
  await expect(page, `url: ${WebBaseUrl}`).toHaveTitle(/Cryptomedic/);

  // Body is loading
  await expect(page.getByTestId("top-level")).toBeVisible();

  // // App is initialized
  // await expect(page.getByTestId("initial-loader")).toHaveCount(0);

  return crReady(page);
}

export async function crExpectUrl(page: Page, r: string | RegExp) {
  await page.waitForURL(r, { timeout: 5000 });
  await expect(page).toHaveURL(r);
}

export async function crReady(page: Page): Promise<void> {
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts#doing_operation_after_fonts_are_loaded
  // https://github.com/microsoft/playwright/issues/28204#issuecomment-1816895791
  await page.evaluate(() => document.fonts.ready);

  // No global spinning wheel anymore
  await expect(page.getByTestId("global-wait"), "crReady").toHaveCount(0);
}

export async function crAcceptPopup(page: Page | Locator, button: string) {
  const box = page.locator(".popup .box .buttons.btn-group");
  await expect(page.locator(".popup .box .buttons.btn-group")).toBeVisible();
  await box.getByText(button).click();

  await expect(box).not.toBeVisible();
}
