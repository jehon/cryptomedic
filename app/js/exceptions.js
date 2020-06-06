
import { toTitleCase } from "./string-utils.js";

export class ApplicationException extends Error {
    data = '';

    constructor(msg) {
        super(msg);
        this.message = msg;
    }

    get id() {
        return this.constructor.name + (this.data ? '#' + this.data : '');
    }

    getMessage() {
        return this.message;
    }
}

export class DataMissingException extends ApplicationException {
    constructor(data = 'some data', reason = 'is missing') {
        super(toTitleCase(data) + ' ' + reason);
        this.data = data;
    }
}

export class DataInvalidException extends ApplicationException {
    constructor(data = 'some data', reason = 'is invalid') {
        super(toTitleCase(data) + ' ' + reason);
        this.data = data;
    }
}

export class ConfigurationMissingException extends ApplicationException {
    constructor(data) {
        super(`Configuration ${data} is missing.`);
        this.data = data;
    }
}

