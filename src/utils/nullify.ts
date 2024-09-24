export default function nullify<T>(what: T): T | null {
  if (what === null || what === undefined) {
    return null;
  }

  if (what === "null") {
    return null;
  }

  if (what === "undefined") {
    return null;
  }

  if (what === "?") {
    return null;
  }

  if (typeof what == "object") {
    return Object.fromEntries(
      Object.entries(what as Record<any, any>).map(([key, value]) => [
        key,
        nullify(value)
      ])
    ) as T;
  }

  return what;
}
