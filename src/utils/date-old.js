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

export function periodAsHumanReadable(dateFrom, dateTo = new Date()) {
  dateFrom = normalizeDate(dateFrom);
  dateTo = normalizeDate(dateTo);

  if (!dateFrom || !dateTo) {
    return "?";
  }

  const secInPeriod = Math.floor(
    (dateTo.getTime() - dateFrom.getTime()) / 1000
  );

  const unit = (number, label) => " " + label + (number > 1 ? "s" : "");

  const years = Math.floor(secInPeriod / 31536000);
  if (years) {
    return years + unit(years, "year");
  }

  const days = Math.floor((secInPeriod % 31536000) / 86400);
  if (days) {
    return days + unit(days, "day");
  }

  const hours = Math.floor((secInPeriod % 86400) / 3600);
  if (hours) {
    return hours + unit(hours, "hour");
  }

  const minutes = Math.floor((secInPeriod % 3600) / 60);
  if (minutes) {
    return minutes + unit(minutes, "minute");
  }

  const seconds = secInPeriod % 60;
  if (seconds) {
    return seconds + unit(seconds, "second");
  }

  return "now";
}
