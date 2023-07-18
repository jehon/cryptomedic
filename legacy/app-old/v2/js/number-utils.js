/**
 * @param {number} nbr to be 'rounded'
 * @param {number} n of decimals
 * @returns {number} rounded
 */
export function nround(nbr, n) {
  const d = Math.pow(10, n);
  return Math.round(nbr * d) / d;
}

/**
 * Parse a string
 *
 * @param {string|number} s to be parsed
 * @returns {number} parsed
 */
export function getFloatFrom(s) {
  if (s instanceof Number) {
    return s;
  }
  const f = parseFloat(s);
  if (isNaN(f)) {
    return 0;
  }
  return f;
}

export function ifError(x, y) {
  if (isFinite(x)) {
    return x;
  }
  return y;
}
