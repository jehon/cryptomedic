import { Page } from "@playwright/test";

export const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

export const PASSWORD = "p";

export function crUrl(segment: string = ""): string {
  return `http://localhost:8085/built/frontend-ng/${segment}`;
}

export function crDebugHooks(page: Page) {
  // Listen for all console logs
  page.on("console", (msg) =>
    console.info("Error from browser: ", { type: msg.type(), text: msg.text() })
  );

  page.on("console", (msg) => console.info("Error from browser 2: ", msg));

  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    const logValues = await Promise.all(
      msgArgs.map(async (arg) => await arg.jsonValue())
    );
    console.warn("Error from browser 3: ", ...logValues);
  });

  page.on("pageerror", (err) =>
    console.error("Uncatched error from browser: ", err)
  );
}
