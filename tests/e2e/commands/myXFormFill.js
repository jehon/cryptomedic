
exports.command = function (selector, data, submit = true) {

    this.myComponentExecute(selector, function (data) { this.data = data; }, data);
    this.pause(100);

    if (submit) {
        this.myComponentExecute(selector, function () { this.checkAndSubmit(); });
    }

};
