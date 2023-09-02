export function padLeftTrim(
  what: string | number,
  l: number,
  char: string = "0"
): string {
  const int = char.repeat(l) + what;
  return int.substring(int.length - l, int.length);
}

export function roundTo(val: number, reference: number): string {
  return "" + Math.round(val / reference) * reference;
}

export function tryOrMessage<T>(fn: () => T): T {
  try {
    return fn();
  } catch (e: any) {
    return e.message;
  }
}

function _canonize(text: string): string[] {
  return text
    .split(/([ _-]|(?=[A-Z]))/g)
    .filter((v) => v && ![" ", "_", "-"].includes(v))
    .map((v) => v.toLowerCase());
}

function toUpperWordCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.substring(1);
}

// /**
//  * (lower) camelCase (abcDefGhi - to use in object)
//  *
//  * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
//  */
// export function toPropertyCase(
//   text: string,
//   firstUpper: boolean = false
// ): string {
//   return _canonize(text)
//     .map((s, i) => (i > 0 || firstUpper ? toUpperWordCase(s) : s))
//     .join("");
// }

/**
 * Transform into kebab case (abc-def-ghi - to use in html)
 *
 * @see https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
 */
export function toAttributeCase(text: string): string {
  return _canonize(text).join("-");
}

/**
 * @param {string} text to be transformed (abc dev ghi)
 * @returns {string} the test in title case (Abc Def Ghi)
 */
export function toTitleCase(text: string): string {
  return _canonize(text).map(toUpperWordCase).join(" ");
}
