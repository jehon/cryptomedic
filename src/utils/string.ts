export function padLeft(
  what: string | number,
  l: number,
  char: string = "0"
): string {
  const int = char.repeat(l) + what;
  return int.substring(int.length - l, int.length);
}
