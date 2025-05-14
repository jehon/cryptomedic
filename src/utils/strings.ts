export function string2number(str: string, def: number = NaN): number {
  try {
    const n = parseFloat(str);
    if (Number.isFinite(n)) {
      return n;
    }
  } catch (_e) {
    // true
  }
  return def;
}

export function string2Boolean(v: any) {
  if (v === undefined || v === null) {
    return false;
  }

  if (typeof v == "boolean") {
    return v;
  }

  if (v == "0" || v == 0) {
    return false;
  }

  if (v == "1" || v == 1) {
    return true;
  }

  return !!v;
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

export function escapeRegExp(string: string): string {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

// From 1970 to 2029 (see help text on patient-element)
export const yearOfBirthPattern =
  "(19[7-9][0-9]|20[0-2][0-9])(-(0?[1-9]|1[0-2]))?";
