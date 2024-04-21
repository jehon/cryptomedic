export function round(n: number, radix: number = 0.01): string {
  return n.toFixed(-Math.log10(radix)).replace(/\.0+$/g, "");
}
