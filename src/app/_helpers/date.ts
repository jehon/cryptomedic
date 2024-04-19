import { StringDate } from "../generic/io/io.component";

export function string2date(
  date_string: StringDate,
  day: number = 1
): Date | undefined {
  // TODO: parse more...

  if (!date_string || date_string.length < 4) {
    return;
  }

  const date_year = parseInt(date_string.substring(0, 4));
  let date_month = parseInt(date_string.substring(5, 7));
  if (isNaN(date_month)) {
    date_month = 1; // emulate january
  }
  return new Date(date_year, date_month - 1, day);
}

export function ageWhen(birth?: Date, when?: Date): string {
  if (!birth || !when) {
    return "?";
  }

  if (when.getTime() - birth.getTime() < 1000 * 60 * 60 * 24 * 31) {
    return "-";
  }

  // We have to take one month less for the range to be ok
  const days = new Date(0, 0, 0, 0, 0, 0, when.getTime() - birth.getTime());
  const res = { years: days.getFullYear() - 1900, months: days.getMonth() };
  return res.years + "y" + res.months + "m";
}
