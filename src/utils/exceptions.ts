function key2string(key: string) {
  return `'${key}'`;
}

export class ApplicationException extends Error {}

export class ConfigurationException extends ApplicationException {}

export class TransportRequestError extends ApplicationException {
  constructor(msg: string) {
    super("Network Error: " + msg);
  }
}

export class ServerRequestError extends ApplicationException {
  constructor(msg: string) {
    super("Server Error: " + msg);
  }
}

class DataException extends ApplicationException {
  #key = "";

  constructor(key: string, msg: string) {
    super(msg);
    this.#key = key;
    this.message = msg;
  }

  getKey() {
    return this.#key;
  }
}

export class DataMissingException extends DataException {
  constructor(key: string) {
    super(key, `${key2string(key)} is not defined`);
  }
}

export class DataOutOfBoundException extends DataException {
  constructor(key: string, value: string | number, limits?: [number, number]) {
    super(
      key,
      `${key2string(key)} is out-of-bounds: ${value}${
        limits ? ` [${limits[0]} -> ${limits[1]}]` : ""
      }`
    );
  }
}

export class DataInvalidException extends DataException {
  constructor(key: string, value?: string | number) {
    super(
      key,
      `${key2string(key)} is invalid` +
        (value !== undefined ? ` (${JSON.stringify(value)})` : "")
    );
  }
}
