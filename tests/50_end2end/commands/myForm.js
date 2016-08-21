exports.command = function(selector, fields, button, afterFillIn) {
  this.
    myFormFillIn(selector, fields);

  if (typeof(afterFillIn) == 'function') {
    afterFillIn.call(this, this);
  }

  // Submit the form:
  this
    .pause(100)
    .myClick(button);

  this
    .myFormCheck(selector, fields);

  return this;
};
