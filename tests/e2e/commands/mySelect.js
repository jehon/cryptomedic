
exports.command = function(selector, value) {
  this
    .click(selector)
    .pause(10)
    ;

  this
    .click("option[value='" + value + "']")
    .pause(10)
    ;

  this
    .keys(this.Keys.ENTER)
    .keys(this.Keys.TAB)
    ;
};
