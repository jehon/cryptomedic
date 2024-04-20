export function round(n: number, radix: number = 2) {
  return "" + Math.round(n / radix) * radix;
}
