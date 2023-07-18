export { default as fireOn } from "../../legacy/app-old/v2/js/fire.js";
export const RefFolder1 = "FolderTest.test1.json";
export const RefFolder1RicketConsult13 = "ricket-consult-13";

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

/**
 * @param url
 */
export function extractPath(url) {
  return url.replace(/^http.?:\/\/localhost:[0-9]+/, "");
}

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
