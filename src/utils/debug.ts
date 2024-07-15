export function promiseLog<T>(data: T): T {
  // eslint-disable-next-line no-console
  console.trace(data);
  return data;
}
