
exports.command = function(selector, optionNumber) {
  var self = this;
  this
    .click(selector);
  for (var i = 0; i < optionNumber; i++) {
    this
      .keys(this.Keys.ARROW_DOWN);
  }
  this
    .keys(this.Keys.ENTER)
    .keys(this.Keys.TAB)
    ;
};
