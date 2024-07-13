import { DataMissingException } from "./exceptions.js";

export const InvalidDate = "Invalid date";

export function normalizeDate(d: string | Date | null) {
  if (d == null) {
    return null;
  }

  if (d instanceof Date) {
    return d;
  }

  return new Date(d);
}

export function date2HumanString(value: Date | null) {
  if (value == null) {
    return "";
  }

  if (isNaN(value.getFullYear())) {
    return InvalidDate;
  }

  // Thanks to https://stackoverflow.com/a/67715865/1954789
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(value);
}

export function fromBirthDateTo(date: Date | null, reference = new Date()) {
  if (date == null) {
    throw new DataMissingException("date");
  }

  if (reference == null) {
    throw new DataMissingException("reference");
  }

  const years = reference.getFullYear() - date.getFullYear();
  const months = reference.getMonth() - date.getMonth();

  return years + months / 12;
}

export function yearsToYM(y: number): string {
  const yy = Math.floor(y);
  const mm = Math.floor(y - yy * 12);

  return (yy > 0 ? yy + "Y" : "") + (mm > 0 ? mm + "M" : "");
}

export function outputDate(value: string | Date | null): string {
  return date2HumanString(normalizeDate(value));
}
