
exports.command = function(selector, fields, button) {
  this.waitForElementVisible(selector);
  for(var f in fields) {
    var fsel = selector + " " + f;
    this.waitForElementVisible(fsel);
    if (fields[f] === true) {
      this
        .click(f);
    } else if (fields[f] === false) {
      //
    } else if (f.substring(0, 6) == "select") {
      this.mySelect(fsel, fields[f]);
    } else {
      this
        .clearValue(f)
        .setValue(fsel, fields[f]);
    }

    this.execute(function(selector) {
      // execute application specific code
      document.querySelector(fsel).blur();
    }, [ fsel ]);
  }
  if (button) {
    this
      .pause(100)
      .myClick(button);
  }


  return this;
};
