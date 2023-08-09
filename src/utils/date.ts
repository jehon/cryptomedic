export function normalizeDate(d: string | Date | null) {
  if (d == null) {
    return null;
  }

  if (d instanceof Date) {
    return d;
  }

  return new Date(d);
}
