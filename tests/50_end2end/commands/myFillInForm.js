exports.command = function(selector, fields, button) {
  var self = this;
  this.waitForElementVisible(selector);
  for(f in fields) {
    this
      .assert.visible(f);
    if (fields[f] === true) {
      this.
        click(f);
    } else {
      this
        .clearValue(f)
        .setValue(f, fields[f]);
    }
  }
  this
    .pause(100)
    .myClick(button);

  return this; // allows the command to be chained.
};
