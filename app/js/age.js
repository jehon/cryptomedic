
import date2CanonicString from './date2CanonicString.js';

export function toBirthDate(years, months, reference) {
    reference = reference || new Date();
    var d2 = new Date(reference.getFullYear() - years, reference.getMonth() - months, 10);
    return date2CanonicString(d2).substring(0, 7);
}
