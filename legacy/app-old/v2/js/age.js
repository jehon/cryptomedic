/**
 * Calculate the birth date based on age and reference date
 *
 * @param {number} years old
 * @param {number} months old
 * @param {Date} reference date (yyyy-mm-dd or date object)
 * @returns {string} representation of the date
 */
function toBirthDate(years, months, reference = new Date()) {
  let dyears = reference.getFullYear() - years;
  let dmonths = reference.getMonth() + 1 - months;
  if (dmonths < 0) {
    dyears--;
    dmonths += 12;
  }
  return dyears + "-" + (dmonths + "").padStart(2, "0");
}
