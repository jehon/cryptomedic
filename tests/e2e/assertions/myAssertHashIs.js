
var util = require('util');
var url = require('url');

exports.assertion = function (expectedText, msg) {
    this.formatMessage = function () {
        const message = util.format(`Testing if url hash ${this.negate ? 'doesn\'t equal' : 'equals'} %s.`);
        return {
            message: msg ? msg : message,
            args: [expectedText]
        };
    };

    this.expected = function () {
        return this.negate ? `is not '${expectedText}'` : `is '${expectedText}'`;
    };

    this.evaluate = function (value) {
        return value == expectedText;
    };

    this.value = function (result) {
        return url.parse(result.value).hash;
    };

    this.command = function (callback) {
        return this.api.url(callback);
    };
};
