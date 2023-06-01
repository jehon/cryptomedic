import _fireOn from "../../../src/app-old/v2/js/fire.js";

export const fireOn = _fireOn;

/**
 * @param name
 */
export function loadReference(name) {
  // Thanks to http://stackoverflow.com/a/27830579/1954789
  let valid_respond = readJSON("www/api/tests/references/" + name);
  expect(valid_respond).not.toBeNull(
    "The reference " + name + " is empty or not found"
  );
  return valid_respond;
}

export const RefFolder1 = "FolderTest.test1.json";
export const RefFolder1RicketConsult13 = "ricket-consult-13";

/**
 * @param url
 */
export function extractPath(url) {
  return url.replace(/^http.?:\/\/localhost:[0-9]+/, "");
}

/* TODO: DEPRECATED */
/* map old version to new one */
/**
 * @param title
 * @param options
 * @param fn
 */
export function webDescribe(title, options, fn) {
  if (typeof options == "object") {
    return withHtml(Object.assign({ title }, options), fn);
  }
  return withHtml({ title, html: options }, fn);
}

/**
 * Count the number of included files
 */
/**
 * @param {string} url - import.meta.url
 * @returns {string} the filename as a test title
 */
export function fn(url) {
  return new URL(url).pathname.split("/").pop();
}
