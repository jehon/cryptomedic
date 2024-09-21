const InvalidDate = "Invalid date";

export function normalizeDate(
  d: string | Date | null | undefined
): Date | undefined {
  if (d == null) {
    return undefined;
  }

  if (d == undefined) {
    return undefined;
  }

  if (d instanceof Date) {
    return d;
  }

  return new Date(d);
}

export function date2HumanString(value: Date | undefined): string {
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

export function yearsToYM(y: number): string {
  const yy = Math.floor(y);
  const mm = Math.floor(y - yy * 12);

  return (yy > 0 ? yy + "Y" : "") + (mm > 0 ? mm + "M" : "");
}

export function outputDate(value: string | Date | undefined): string {
  return date2HumanString(normalizeDate(value));
}

export function periodAsHumanReadable(
  dateFrom: Date | string | undefined,
  dateTo: Date | undefined = new Date(),
  timeIncluded = false
): string {
  dateFrom = normalizeDate(dateFrom);
  dateTo = normalizeDate(dateTo);

  if (!dateFrom || !dateTo) {
    return "?";
  }

  const secInPeriodSigned = Math.floor(
    (dateTo.getTime() - dateFrom.getTime()) / 1000
  );

  const relative = secInPeriodSigned > 0 ? " ago" : " onward";

  const secInPeriod = Math.abs(secInPeriodSigned);

  const unit = (number: number, label: string) =>
    " " + label + (number > 1 ? "s" : "");

  const years = Math.floor(secInPeriod / 31536000);
  if (years) {
    return years + unit(years, "year") + relative;
  }

  const days = Math.floor((secInPeriod % 31536000) / 86400);
  if (days) {
    return days + unit(days, "day") + relative;
  }

  if (!timeIncluded) {
    return "today";
  }

  const hours = Math.floor((secInPeriod % 86400) / 3600);
  if (hours) {
    return hours + unit(hours, "hour") + relative;
  }

  const minutes = Math.floor((secInPeriod % 3600) / 60);
  if (minutes) {
    return minutes + unit(minutes, "minute") + relative;
  }

  return "now";
}
