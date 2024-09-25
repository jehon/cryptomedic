const pad = (what, l) => {
  const int = "000" + what;
  return int.substring(int.length - l, int.length);
};

const Invalid = "Invalid date";

// TODO: choose between date2Display and date2CanonicString
// Used by x-display-date

/**
 * Render a date to display
 *
 * @param {Date} date to be rendered
 * @returns {string} the rendered date
 */
export default function date2Display(date) {
  if (date == null) {
    return "";
  }
  let dateObj = date;
  if (typeof date == "string") {
    if (date == "") {
      return "";
    }
    dateObj = new Date(date);
  }
  if (isNaN(dateObj.getFullYear())) {
    return Invalid;
  }
  return `${pad(dateObj.getDate(), 2)}-${pad(dateObj.getMonth() + 1, 2)}-${pad(
    dateObj.getFullYear(),
    4
  )}`;
}
