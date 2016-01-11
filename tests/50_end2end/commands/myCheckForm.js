exports.command = function(selector, fields) {
  var self = this;
  this.waitForElementVisible(selector);
  for(f in fields) {
    if (fields[f] === true) {
      this
        .assert.visible(f + "_ok");
    } if (fields[f] === false) {
      this
        .assert.visible(f + "_ko");
    } else {
      this
        .assert.visible(f)
        .assert.containsText(f, fields[f]);
    }
  }
  return this; // allows the command to be chained.
};
