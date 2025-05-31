/**
 *
 * @param {string|undefined|null} key
 */
function key2string(key) {
  return `'${key}'`;
}

export class ApplicationException extends Error {}

export class TransportRequestError extends ApplicationException {
  constructor(msg) {
    super("Network Error: " + msg);
  }
}

// used in x-fff-age.js
export class DataException extends ApplicationException {
  #key = "";

  constructor(key, msg) {
    super(msg);
    this.#key = key;
    this.message = msg;
  }

  getKey() {
    return this.#key;
  }
}

export class DataMissingException extends DataException {
  constructor(key) {
    super(key, `${key2string(key)} is not defined`);
  }
}

export class DataInvalidException extends DataException {
  /**
   *
   * @param {string} key
   * @param {any} value
   */
  constructor(key, value = undefined) {
    super(
      key,
      `${key2string(key)} is invalid` +
        (value !== undefined ? ` (${JSON.stringify(value)})` : "")
    );
  }
}
