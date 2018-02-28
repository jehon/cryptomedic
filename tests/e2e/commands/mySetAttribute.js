
exports.command = function(selector, attributeName, attributeValue, callback) {
  var self = this;
  this.waitForElementVisible(selector);
  this.assert.visible(selector);
  this.myScreenshot("click");

  // http://stackoverflow.com/questions/38102543/when-running-nightwatch-js-test-how-can-i-get-the-name-of-browser-currently-runn

  this.execute(function(selector, attributeName, attributeValue) {
    let el = document.querySelector(selector);
    el.setAttribute(attributeName, attributeValue);
    return true;
  },
  [ selector, attributeName, attributeValue ], // arguments array to be passed
  function(result) {
    if (typeof callback === 'function') {
      callback.call(self, result);
    }
  });
  return this;
};
