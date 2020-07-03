
import { toPropertyCase, toSentenceCase } from './string-utils.js';

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
        super(toSentenceCase(data) + ' ' + reason);
        this.data = data;
    }
}

export class DataInvalidException extends ApplicationException {
    constructor(data = 'some data', reason = 'is invalid') {
        super(toSentenceCase(data) + ' ' + reason);
        this.data = data;
    }
}

export class ConfigurationMissingException extends ApplicationException {
    constructor(data) {
        super(`Configuration '${toSentenceCase(data, true)}' is missing.`);
        this.data = data;
    }
}

