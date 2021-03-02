
exports.command = function (selector, values, submit = true) {

    this.myComponentExecute(selector, function (values) { this.setValues(values); }, values);
    this.pause(100);

    if (submit) {
        this.myComponentExecute(selector, function () { this.checkAndSubmit(); });
    }

};
