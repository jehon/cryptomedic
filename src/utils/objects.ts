export function deepFreeze<T extends Record<any, any>>(object: T): T {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function removeNull<T extends Record<any, any>>(object: T): T {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    if (object[name] == null || object[name] == undefined) {
      delete object[name];
    }
  }
  return object;
}

export function isEmptyValue(v: any): boolean {
  return (
    v === undefined || v === null || v === "" || v === false || Number.isNaN(v)
  );
}
