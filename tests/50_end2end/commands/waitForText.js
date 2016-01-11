// @See https://github.com/nightwatchjs/nightwatch/issues/246#issuecomment-59461345
// Usage:
//
// client
//     .waitForText(someCssLocator, function (text) {
//         return text === someValue; // this can be any expression
//     });

var util = require("util");
var events = require("events");
// var TestConstants = require('../pageObjects/testConstants.js');

/*
 * This custom command allows us to locate an HTML element on the page and then wait until the value of the element's
 * inner text (the text between the opening and closing tags) matches the provided expression (aka. the 'checker' function).
 * It retries executing the checker function every 100ms until either it evaluates to true or it reaches
 * maxTimeInMilliseconds (which fails the test).
 * Nightwatch uses the Node.js EventEmitter pattern to handle asynchronous code so this command is also an EventEmitter.
 */

function WaitForText() {
  events.EventEmitter.call(this);
  this.startTimeInMilliseconds = null;
}

util.inherits(WaitForText, events.EventEmitter);

WaitForText.prototype.command = function (element, checker, timeoutInMilliseconds) {
  this.startTimeInMilliseconds = new Date().getTime();
  var self = this;
  var message;

  if (typeof timeoutInMilliseconds !== "number") {
      timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

  this.check(element, checker, function (result, loadedTimeInMilliseconds) {
      if (result) {
          message = "waitForText: " + element + ". Expression was true after " + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + " ms.";
        } else {
          message = "waitForText: " + element + ". Expression wasn't true in " + timeoutInMilliseconds + " ms.";
        }
      self.client.assertion(result, "expression false", "expression true", message, true);
      self.emit("complete");
    }, timeoutInMilliseconds);

  return this;
};

WaitForText.prototype.check = function (element, checker, callback, maxTimeInMilliseconds) {
  var self = this;

  this.api.getText(element, function (result) {
      var now = new Date().getTime();
      if (result.status === 0 && checker(result.value)) {
          callback(true, now);
        } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
          setTimeout(function () {
              self.check(element, checker, callback, maxTimeInMilliseconds);
            }, 50); // Frequency of retest
        } else {
          callback(false);
        }
    });
};

module.exports = WaitForText;
