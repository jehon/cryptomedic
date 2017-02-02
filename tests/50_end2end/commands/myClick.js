
exports.command = function(selector, callback) {
  var self = this;
  this.waitForElementVisible(selector);
  this.assert.visible(selector);
  this.myScreenshot("click");

  // http://stackoverflow.com/questions/38102543/when-running-nightwatch-js-test-how-can-i-get-the-name-of-browser-currently-runn

  this.execute(function(selector) {
    document.querySelector(selector).focus();
    if (typeof(document.querySelector(selector).click) == 'function') {
      document.querySelector(selector).click();
    } else {
      var ev = document.createEvent('MouseEvent');
      ev.initMouseEvent(
          'click',
          true /* bubble */, true /* cancelable */,
          window, null,
          0, 0, 0, 0, /* coordinates */
          false, false, false, false, /* modifier keys */
          0 /*left*/, null
      );
      document.querySelector(selector).dispatchEvent(ev);
    }
    return true;
  },
  [ selector ], // arguments array to be passed
  function(result) {
    // if (typeof callback === 'function') {
    //   callback.call(self, result);
    // }
  }
  );
  this.pause(10);
  return this;
};
