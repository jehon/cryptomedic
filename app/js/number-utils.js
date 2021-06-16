
/**
 * @param {number} nbr to be 'rounded'
 * @param {number} n of decimals
 * @returns {number} rounded
 */
export function nround(nbr, n) {
    const d = Math.pow(10, n);
    return Math.round(nbr * d) / d;
}
