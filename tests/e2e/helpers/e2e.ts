import { APIResponse, expect, Locator, Page } from "@playwright/test";
import { CRUD, CRUDType, IndexSignature } from "../../../src/constants";
import { passThrough } from "../../../src/utils/promises";
export { outputDate } from "../../../src/utils/date";

const WebBaseUrl = `http://${process.env["CRYPTOMEDIC_DEV_HTTP_HOST"]}:8085`;
type JsonData = any;

const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

const PASSWORD = "p";

export function crUrl(segment: string = ""): string {
  return `${WebBaseUrl}/built/frontend/ng1x.html#${segment}`;
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
      passThrough<APIResponse>((resp) => {
        if (resp.status() != 200) {
          throw new Error(
            "Server responded with invalid status: " + resp.status()
          );
        }
      })
    )
    .then((resp: APIResponse) => resp.json());
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
  await expect(page).toHaveTitle(/Cryptomedic/);

  // Body is loading
  await expect(page.getByTestId("top-level")).toBeVisible();

  // // App is initialized
  // await expect(page.getByTestId("initial-loader")).toHaveCount(0);

  return crReady(page);
}

export async function crExpectUrl(page: Page, r: string | RegExp) {
  await expect(page).toHaveURL(r);
}

async function crReady(page: Page): Promise<void> {
  // No global spinning wheel anymore
  await expect(page.getByTestId("global-wait")).toHaveCount(0);
}

export async function crLegacyInput(
  page: Page | Locator,
  selector: string,
  value: string | number
): Promise<void> {
  const el = page.locator(selector);
  await expect(el).toBeVisible();
  const input = el.locator("input");
  await expect(input).toBeVisible();
  await input.fill("" + value);
  await expect(input).toHaveValue("" + value);
}