exports.command = function(selector, fields, button) {
  var self = this;
  this.waitForElementVisible(selector);
  for(f in fields) {
    this
      .assert.visible(f);
    if (fields[f] === true) {
      this.
        click(f);
    } if (fields[f] === false) {

    } if (f.substring(0, 6) == "select") {
      this.mySelect(f, fields[f]);
      // this
      //   .click(f);
      // for (var i = 0; i < fields[f]; i++) {
      //   this
      //     .keys(this.Keys.ARROW_DOWN);
      // }
      // this
      //   .keys(this.Keys.ENTER)
      //   .keys(this.Keys.TAB)
      //   ;
    } else {
      this
        .clearValue(f)
        .setValue(f, fields[f]);
    }
  }
  // this.pause(1000);
  if (button) {
    this
      .pause(100)
      .myClick(button);
  }

  return this; // allows the command to be chained.
};
