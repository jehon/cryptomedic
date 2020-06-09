
// Unused

exports.assertion = function (definition, expectedText, msg) {
    // exports.assertion = function(selector, content, msg) {

    this.options = {
        elementSelector: true
    };

    this.formatMessage = function () {
        const message = `Testing the <%s> ${this.negate ? 'doesn\'t equal % s' : 'equals % s'}`;

        return {
            message: msg ? msg : message,
            args: ['${expected}']
        };
    };

    this.expected = function () {
        return this.negate ? `is not '${expectedText}'` : `is '${expectedText}'`;
    };

    this.evaluate = function (value) {
        if (typeof value != 'string') {
            return false;

        }
        return value === this.expected;
    };

    this.value = function (result) {
        return result.value;
    };

    this.command = function (callback) {
        // fn =
        // args = [ , , ,  ]
        return this.api.execute(fn, args, callback);
    };

};
