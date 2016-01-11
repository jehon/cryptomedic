exports.command = function(selector, callback) {
  var self = this, fs = require("fs");
  this.waitForElementVisible(selector);
  this.execute(function(selector) {
          // execute application specific code
    if (typeof(document.querySelector(selector).click) == "function") {
            document.querySelector(selector).click();
          } else {
            var ev = document.createEvent("MouseEvent");
            ev.initMouseEvent(
                    "click",
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
          if (typeof callback === "function") {
            callback.call(self, result);
          }
        }
  );
  this.pause(100);
  return this;
};
