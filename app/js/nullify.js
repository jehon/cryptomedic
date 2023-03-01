/**
 * Treat the object received from json, and standardize its content
 *
 * @param {object} what to be nullified
 * @returns {object} the object treated
 */
function nullifyOjbect(what) {
  let what2 = {};
  for (var k in what) {
    what2[k] = nullify(what[k]);
  }
  // });
  return what2;
}

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
      return nullifyOjbect(what);
  }
  return what;
}
