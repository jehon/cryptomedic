exports.command = function(selector, fields, button) {
  this.
    myFormFillIn(selector, fields);

  // Submit the form:
  this
    .pause(100)
    .myClick(button);

  this
    .myFormCheck(selector, fields);

  return this;
};
