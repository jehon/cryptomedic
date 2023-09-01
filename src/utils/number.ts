export function roundTo(val: number, reference: number): number {
  return Math.round(val / reference) * reference;
}
