import { DataMissingException } from "./exceptions.js";

/**
 * @returns {Date|null}
 */
export function normalizeDate(d) {
  if (d == null) {
    return null;
  }

  if (d instanceof Date) {
    return d;
  }

  return new Date(d);
}

/**
 *
 * @param {Date|null} date
 * @param {Date|null} reference
 * @returns {number}
 */
export function fromBirthDateTo(date, reference = new Date()) {
  if (date == null) {
    throw new DataMissingException("date");
  }

  if (reference == null) {
    throw new DataMissingException("reference");
  }

  let years = reference.getFullYear() - date.getFullYear();
  let months = reference.getMonth() - date.getMonth();

  return years + months / 12;
}
