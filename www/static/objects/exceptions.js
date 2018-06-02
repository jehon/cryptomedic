
class ApplicationException extends Error {
	constructor(msg) {
		super(msg);
		this.message = msg;
	}

	getMessage() {
		return this.message;
	}
}

class DataMissingException extends ApplicationException {
	constructor(data, reason = 'is missing') {
		super('Data '  + (data || 'some data') + ' ' + reason);
		this.data = data;
	}
}

class ConfigurationMissingException extends ApplicationException {
	constructor(data) {
		super(`Configuration ${data} is missing.`);
		this.data = data;
	}
}
