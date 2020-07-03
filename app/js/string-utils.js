
/**
 * @param {string} text to be transformed
 * @returns {Array<string>} an array of words
 */
export function _canonize(text) {
    return text
        .split(/([ _-]|(?=[A-Z]))/g)
        .filter(v => v && ![' ', '_', '-'].includes(v))
        .map(v => v.toLowerCase());
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
 * @param middle
 * @returns {string} the test in title case (Abc Def Ghi)
 */
export function toSentenceCase(text, middle = false) {
    return _canonize(text)
        .map((s, i) => ((i == 0 && !middle) ? toUpperWordCase(s) : s))
        .join(' ');
}

/**
 * @param {string} text to be transformed (abc dev ghi)
 * @returns {string} the test in title case (Abc Def Ghi)
 */
export function toTitleCase(text) {
    return _canonize(text)
        .map(toUpperWordCase)
        .join(' ');
}

/**
 * Transform into camel case (abcDefGhi - to use in object)
 *
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 *
 * @param {string} text to be transformed (abc-def-ghi)
 * @returns {string} transformed into camel case (AbcDefGhi)
 */
export function toPropertyCase(text) {
    return _canonize(text)
        .map((s, i) => (i > 0 ? toUpperWordCase(s) : s))
        .join('');
}

/**
 * Transform into kebab case (abc-def-ghi - to use in html)
 *
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 *
 * @param {string} text to be transformed (abcDefGhi)
 * @returns {string} transformed into kebab case (AbcDefGhi)
 */
export function toAttributeCase(text) {
    return _canonize(text)
        .join('-');
}
