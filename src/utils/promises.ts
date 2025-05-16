export function passThrough<T>(cb: (t: T) => void): (t: T) => T {
  return (t) => {
    cb(t);
    return t;
  };
}

// export function delayed<T>(secs: number): (t: T) => Promise<T> {
//   return (t) =>
//     new Promise<T>((resolve) => {
//       setTimeout(() => resolve(t), 1000 * secs);
//     });
// }
