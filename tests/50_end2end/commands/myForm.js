exports.command = function(selector, fields, button, afterFillIn, afterCheck) {
  this.
    myFormFillIn(selector, fields);

  if (typeof(afterFillIn) == 'function') {
    afterFillIn.bind(this, this);
  }

  if (typeof(button) == 'function') {
    button.bind(this, this);
  } else {
    // Submit the form:
    this
      .pause(100)
      .myClick(button);
  }

  this
    .myFormCheck(selector, fields);

  if (typeof(afterCkeck) == 'function') {
    afterCheck.bind(this, this);
  }

  return this;
};
