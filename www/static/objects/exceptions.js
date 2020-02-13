
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
	constructor(data = 'some data', reason = 'is missing') {
		super('Data '  + data + ' ' + reason);
		this.data = data;
	}
}

export class ConfigurationMissingException extends ApplicationException {
	constructor(data) {
		super(`Configuration ${data} is missing.`);
		this.data = data;
	}
}
