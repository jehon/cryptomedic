
export class ApplicationException extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg;
  }

  getMessage() {
    return this.message;
  }
}

export class DataMissingException extends ApplicationException {
  constructor(data) {
    super('Missing '  + (data || 'some data'));
    this.data = data;
  }
}
