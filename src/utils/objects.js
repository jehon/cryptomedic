// Thanks to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
/**
 * @template {object} T
 * @param {T} object to be freezed
 * @returns {T} The object being freezed
 */
export function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
    let value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
