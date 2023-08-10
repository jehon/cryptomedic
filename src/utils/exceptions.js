// TODO: data field could be sentenced

export class WithDataError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

export class ApplicationException extends Error {
  data = "";

  constructor(msg) {
    super(msg);
    this.message = msg;
  }

  get id() {
    return this.constructor.name + (this.data ? "#" + this.data : "");
  }

  getMessage() {
    return this.message;
  }
}

export class DataMissingException extends ApplicationException {
  constructor(data = "some data", reason = "is missing") {
    super(data + " " + reason);
    this.data = data;
  }
}

export class DataOutOfBoundException extends ApplicationException {
  /**
   * @param {string} data - which field
   * @param {Array<any>} limits - [min, max]
   */
  constructor(data = "some data", limits = null) {
    super(
      `${data} is out-of-bounds` +
        (limits ? ` [${limits[0]} -> ${limits[1]}]` : "")
    );
    this.data = data;
  }
}

export class DataInvalidException extends ApplicationException {
  constructor(data = "some data", reason = "is invalid") {
    super(data + " " + reason);
    this.data = data;
  }
}

export class ConfigurationMissingException extends ApplicationException {
  constructor(data) {
    super(`Configuration '${data}' is missing.`);
    this.data = data;
  }
}
