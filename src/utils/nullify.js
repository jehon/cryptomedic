/**
 * Treat the object received from json, and standardize its content
 *
 * @param {object} what to be normalized
 * @returns {*} normalized
 */
export default function nullify(what) {
  switch (typeof what) {
    case "string":
      if (what === "?") {
        return null;
      }
      if (what === "null") {
        return null;
      }
      if (what === "undefined") {
        return null;
      }
      return what;
    case "object":
      if (what == null) {
        return what;
      }
      return Object.fromEntries(what.entries().map((v, k) => nullify(v)));
    default:
  }
  return what;
}
