exports.command = function(selector, fields) {
  this.waitForElementVisible(selector);
  for(var f in fields) {
    var fsel = selector + " " + f;
    if (f.substr(0, 6) == "select") {
      fsel = selector + " " + f.substr(6);
    }
    this.waitForElementVisible(fsel + ":not(input)");
    if (fields[f] === true) {
      this
        .assert.visible(fsel + '_ok');
    } else if (fields[f] === false) {
      this
        .assert.visible(fsel + '_ko');
    } else if (typeof(fields[f]) == 'object') {
      this
        .assert.visible(fsel)
        .assert.containsText(fsel, fields[f].value);
    } else {
      this
        .assert.visible(fsel)
        .assert.containsText(fsel, fields[f]);
    }
  }
  return this; // allows the command to be chained.
};
