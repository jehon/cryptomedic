import hash from "./hash.js";

/* global platform */
import platform from "../../../built/platform.js";

/* istanbul ignore else: impossible to test */
if (!("browserUUID" in localStorage)) {
  localStorage.browserUUID = hash(navigator.userAgent + ":" + new Date());
  console.info("Generated browser UUID: ", localStorage.browserUUID);
}

export const browserUUID = localStorage.browserUUID;

/**
 * @returns {boolean} true if we are in production (non "localhost")
 */
export function isProduction() {
  /* istanbul-ignore-next */
  return window.location.host.substr(0, "localhost".length) != "localhost";
}

/**
 * When login into the application, add some explanations
 *
 * @returns {object} Get the description of the browser
 */
export function getBrowserDescription() {
  // console.info("platform", platform);

  return {
    browser_uuid: browserUUID,
    browser_name: platform.name,
    browser_version: platform.version,
    browser_full_name: platform.description,
    screen_height: window.screen.height,
    screen_width: window.screen.width,
    os: [platform.os.family || "", platform.os.version || ""].join(" "),
    feat_test: true,
    feat_fromentries: "fromEntries" in Object
  };
}
