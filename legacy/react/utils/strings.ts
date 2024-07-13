export function padLeftTrim(
  what: string | number,
  l: number,
  char: string = "0"
): string {
  const int = char.repeat(l) + what;
  return int.substring(int.length - l, int.length);
}

export function roundTo(val: number, decimals: number = 1): string {
  return val.toFixed(decimals);
}

export function tryOrMessage(fn: () => any, msg?: string): string {
  try {
    return "" + fn();
  } catch (e: any) {
    if (msg !== undefined) {
      return msg;
    }
    return e.message;
  }
}

function _canonize(text: string): string[] {
  return (
    text
      .split(/([ _-]|(?=[A-Z]))/g)
      .filter((v) => v && ![" ", "_", "-"].includes(v))
      .reduce((acc: string[], val: string) => {
        // We agglomerate successive ABC
        const l = acc.length - 1;
        if (l > 0 && val.match(/^[A-Z]+$/g) && acc[l].match(/^[A-Z]+$/g)) {
          acc[l] += val;
        } else {
          acc.push(val);
        }
        return acc;
      }, [])
      // Reduce only if not fully uppercase (ex: CDC)
      .map((v) => (v.match(/^[A-Z]+$/) ? v : v.toLowerCase()))
  );
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
