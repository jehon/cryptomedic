export {
  fn,
  fireOn,
  RefFolder1,
  RefFolder1RicketConsult13,
  extractPath,
  loadReference
} from "../test-lib.js";

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
