export function passThrough<T>(cb: (t: T) => any): (t: T) => T {
  return (t) => {
    cb(t);
    return t;
  };
}

// ts-unused-exports:disable-next-line
export function promiseLog<T>(data: T): T {
  // eslint-disable-next-line no-console
  console.trace(data);
  return data;
}
