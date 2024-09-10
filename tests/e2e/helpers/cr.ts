import { expect, Locator, Page } from "@playwright/test";
import { CRUD, CRUDType, JsonData } from "../../../src/constants";
import { passThrough } from "../../../src/utils/promises";
export { outputDate } from "../../../src/utils/date";

const WebBaseUrl = `http://${process.env.CRYPTOMEDIC_DEV_HTTP_HOST}:8085`;

export const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

export const PASSWORD = "p";

function crUrl(segment: string = ""): string {
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
  return page.request[(options.method ?? CRUD.read).toLowerCase()](
    crUrlAPI(url),
    {
      data: options.data ?? {}
    }
  )
    .then(
      passThrough((resp) => {
        if (resp.status() != 200) {
          throw new Error(
            "Server responded with invalid status: " + resp.status()
          );
        }
      })
    )
    .then((resp) => resp.json());
}

export function crApiLogin(page: Page, login: string = LOGINS.PHYSIO) {
  return crApi(page, "/auth/mylogin", {
    method: CRUD.submit,
    data: {
      username: login,
      password: PASSWORD
    }
  });
}

export function crDebugHooks(page: Page): void {
  // Listen for all console logs
  // page.on("console", (msg) =>
  //   console.info("Error from browser: ", { type: msg.type(), text: msg.text() })
  // );

  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    const logValues = await Promise.all(
      msgArgs.map(async (arg) => await arg.jsonValue())
    );
    console.warn(
      "Error from browser: ",
      JSON.stringify(
        { type: msg.type(), text: msg.text(), logs: logValues },
        null,
        2
      )
    );
  });

  page.on("pageerror", (err) =>
    console.warn("Uncatched error from browser: ", err)
  );
}

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

export async function crReady(
  page: Page
  // options: { forScreenshot?: boolean } = {}
): Promise<void> {
  // No global spinning wheel anymore
  await expect(page.getByTestId("global-wait")).toHaveCount(0);

  // if (options.forScreenshot) {
  //   // No ToastR
  //   await expect(page.getByRole("alert")).toHaveCount(0);
  // }
}

export function expectField(where: Page | Locator, label: string): Locator {
  return where.locator(`[data-role='${label}']`);
}

export async function expectFieldValue(
  where: Page | Locator,
  label: string,
  value?: string | number
): Promise<void> {
  const io = expectField(where, label);

  if (value) {
    await expect(io).toBeVisible();

    const ioc = io.locator(".content");
    await expect(ioc).toBeVisible();
    await expect((await ioc.textContent())?.trim() ?? "").toBe("" + value);
  } else {
    await expect(io).not.toBeVisible();
  }
}

export async function setFieldValue(
  where: Page | Locator,
  label: string,
  value: string,
  type: "" | "textarea" | "select" = ""
): Promise<void> {
  const io = expectField(where, label);
  await expect(io).toBeVisible();

  const ioc = io.locator(".content");
  await expect(ioc).toBeVisible();

  switch (type) {
    case "":
      await expect(ioc.locator("input")).toBeVisible();
      await ioc.locator("input").fill("" + value);
      break;
    case "textarea":
      await expect(ioc.locator("textarea")).toBeVisible();
      await ioc.locator("textarea").fill("" + value);
      break;
    case "select":
      await expect(ioc.locator("select")).toBeVisible();
      await ioc.locator("select").selectOption({ label: "" + value });
      break;
    default:
      throw new Error("Unknown type: " + type);
  }
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
