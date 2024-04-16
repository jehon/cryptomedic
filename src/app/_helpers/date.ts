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
