
exports.command = function(selector, fields, button) {
  this.waitForElementVisible(selector);
  this.assert.visible(selector);
  for(var f in fields) {
    var fsel = selector + " " + f;
    this.waitForElementVisible(fsel);

    // Put focus on element
    this.execute(function(fsel) {
      document.querySelector(fsel).focus();
    }, [ fsel ]);

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

    // http://nightwatchjs.org/api#keys
    // https://www.w3.org/TR/webdriver/#dfn-processing-keystrokes

    // client.Keys.TAB
    this.keys(this.Keys.TAB);

    // Loose focus on element
    this.execute(function(fsel) {
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
