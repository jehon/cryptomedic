export function nArray<T>(arr: Array<T> | undefined): Array<T> {
  if (arr == undefined) {
    return [];
  }
  return arr;
}
