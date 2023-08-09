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
