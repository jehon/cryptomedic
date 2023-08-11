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

export class TransportRequestError extends ApplicationException {
  constructor(request) {
    super("Network Error", request);
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
   * @param {Array<any>} limits - [min, max]
   */
  constructor(key, limits = null) {
    super(
      key,
      `${key2string(key)} is out-of-bounds${
        limits ? ` [${limits[0]} -> ${limits[1]}]` : ""
      }`
    );
  }
}

export class DataInvalidException extends DataException {
  constructor(key, value = undefined) {
    super(
      key,
      `${key2string(key)} is invalid` +
        (value !== undefined ? ` (${JSON.stringify(value)})` : "")
    );
  }
}

export class ConfigurationException extends Error {}

export class ConfigurationMissingException extends DataException {
  constructor(key) {
    super(key, `Configuration ${key2string(key)} is missing.`);
  }
}
