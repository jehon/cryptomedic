/**
 * @param {string} text to be transformed
 * @returns {Array<string>} an array of words
 */
export function _canonize(text) {
  return (
    text
      // .split(/([ _-]|(?=[A-Z][a-z]))/g)
      .split(/([ _-]|(?=[A-Z]))/g)
      .filter((v) => v && ![" ", "_", "-"].includes(v))
      .map((v) => v.toLowerCase())
  );
}

/**
 * @param {string} text a word
 * @returns {string} the same word with a first letter uppercase
 */
function toUpperWordCase(text) {
  return text.charAt(0).toUpperCase() + text.substring(1);
}

/**
 * @param {string} text to be transformed (abc dev ghi)
 * @param {boolean} middle if the string has to be put in the middle of a block (... abc def)
 * @returns {string} the test in title case (Abc def ghi)
 */
export function toSentenceCase(text, middle = false) {
  return _canonize(text)
    .map((s, i) => (i == 0 && !middle ? toUpperWordCase(s) : s))
    .join(" ");
}

/**
 * @param {string} text to be transformed (abc dev ghi)
 * @returns {string} the test in title case (Abc Def Ghi)
 */
function toTitleCase(text) {
  return _canonize(text).map(toUpperWordCase).join(" ");
}

/**
 * Transform into camel case (abcDefGhi - to use in object)
 *
 * @param {string} text to be transformed (abc-def-ghi)
 * @param {boolean} middle if the string has to be put in inside of a block (...AbcDef)
 * @returns {string} transformed into camel case (AbcDefGhi)
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 */
export function toPropertyCase(text, middle = false) {
  return _canonize(text)
    .map((s, i) => (i > 0 || middle ? toUpperWordCase(s) : s))
    .join("");
}

/**
 * Transform into kebab case (abc-def-ghi - to use in html)
 *
 * @param {string} text to be transformed (abcDefGhi)
 * @returns {string} transformed into kebab case (AbcDefGhi)
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 */
export function toAttributeCase(text) {
  return _canonize(text).join("-");
}

/**
 * @param {string} template as the template to be built
 * @returns {function(object): string} that can interplate the string
 */
function buildTemplate(template) {
  // const names = Object.keys(params);
  // const vals = Object.values(params);
  return /** @type {function(object): string} */ (
    new Function("data", `return \`${template}\`;`)
  );
}
