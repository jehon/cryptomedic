/**
 * Treat the object received from json, and standardize its content
 *
 * @param {*} what to be normalized
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
      if (what === null) {
        return null;
      }
      return Object.fromEntries(
        Object.entries(what).map(([key, value]) => [key, nullify(value)])
      );
    default:
      return what;
  }
}
