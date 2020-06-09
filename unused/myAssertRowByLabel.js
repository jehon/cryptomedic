
// https://github.com/nightwatchjs/nightwatch-docs/blob/master/guide/extending-nightwatch/custom-assertions.md

var util = require('util');

exports.assertion = function (selector, row, expectedText, msg) {
    this.options = {
        elementSelector: true
    };

    this.formatMessage = function () {
        const message = util.format(`Testing if table <${selector}>@row=<${row}> ${this.negate ? 'doesn\'t equal ' : 'equals '} text: '%s'.`);

        return {
            message,
            args: [`'${expectedText}'`]
        };
    };

    this.expected = function () {
        return this.negate ? `is not '${expectedText}'` : `is '${expectedText}'`;
    };

    this.evaluate = function (value) {
        return value.indexOf(expectedText) > -1;
    };

    /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command's
   * callback as argument.
   * @type {function}
   */
    this.value = function (result) {
        return result.value;
    };

    /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
    this.command = function (callback) {
        var el = this.api.element(this.client.locateStrategy, selector, callback);
        return el;
    };
};
