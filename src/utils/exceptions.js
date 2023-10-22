// TODO: data field could be sentenced

/**
 *
 * @param {string|undefined|null} key
 */
function key2string(key) {
  return `'${key}'`;
}

export class ApplicationException extends Error {
  getId() {
    return this.constructor.name;
  }
}

export class ConfigurationException extends ApplicationException {}

export class TransportRequestError extends ApplicationException {
  constructor(msg) {
    super("Network Error: " + msg);
  }
}

export class ServerRequestError extends ApplicationException {
  constructor(msg) {
    super("Server Error: " + msg);
  }
}

export class DataException extends ApplicationException {
  #key = "";

  constructor(key, msg) {
    super(msg);
    this.#key = key;
    this.message = msg;
  }

  getId() {
    return super.getId() + "#" + this.#key;
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

export class DataOutOfBoundException extends DataException {
  /**
   * @param {string} key - which field
   * @param {any} key - what value
   * @param {Array<any>} limits - [min, max]
   */
  constructor(key, value, limits = null) {
    super(
      key,
      `${key2string(key)} is out-of-bounds: ${value}${
        limits ? ` [${limits[0]} -> ${limits[1]}]` : ""
      }`
    );
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

// TODO: useless - use ConfigurationException
export class ConfigurationMissingException extends DataException {
  constructor(key) {
    super(key, `Configuration ${key2string(key)} is missing.`);
  }
}
