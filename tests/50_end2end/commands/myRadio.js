
exports.command = function(selector, value) {
  this
    .click(selector + '[value=' + value + ']')
    // .pause(5);
    ;

  return this;
};
