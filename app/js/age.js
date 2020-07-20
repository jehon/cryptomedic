
import date2CanonicString from './date2CanonicString.js';

/**
 * Calculate the birth date based on age and reference date
 *
 * @param {number} years old
 * @param {number} months old
 * @param {Date} reference date (yyyy-mm-dd or date object)
 * @returns {string} representation of the date
 */
export function toBirthDate(years, months, reference = new Date()) {
    var d2 = new Date(reference.getFullYear() - years, reference.getMonth() - months, 10);
    return date2CanonicString(d2).substring(0, 7);
}
