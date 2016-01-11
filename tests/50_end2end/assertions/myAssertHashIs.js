// http://nightwatchjs.org/guide#writing-custom-commands
// https://github.com/beatfactor/nightwatch/blob/master/lib/api/assertions/containsText.js
var util = require("util");
var url = require("url");

exports.assertion = function(expected, msg) {
  var MSG = util.format("Testing if url hash is %s.", expected);
  /**
   * The message which will be used in the test output and
   * inside the XML reports
   * @type {string}
   */
  this.message = msg || MSG;
  
  /**
   * A value to perform the assertion on. If a function is
   * defined, its result will be used.
   * @type {function|*}
   */
  this.expected = function() {
    return expected;
  };
    
  /**
   * The method which performs the actual assertion. It is
   * called with the result of the value method as the argument.
   * @type {function}
   */
  this.pass = function(value) {
    return value == expected;
  };

  this.fail = function(value) {
    var failed = result === false || result && result.status === -1;
    if (failed) {
        this.message = this.message + util.format(": Found <%s>", value);  
      }
    return failed;
  };
  
  /**
   * The method which returns the value to be used on the
   * assertion. It is called with the result of the command's
   * callback as argument.
   * @type {function}
   */
  this.value = function(result) {
    var parsed = url.parse(result.value);
    return parsed.hash;
  };

  /**
   * Performs a protocol command/action and its result is
   * passed to the value method via the callback argument.
   * @type {function}
   */
  this.command = function(callback) {
    return this.api.url(callback);
  };

};