export function passThrough<T>(cb: (t: T) => any): (t: T) => T {
  return (t) => {
    cb(t);
    return t;
  };
}
