
let transitions = {
  _define: function(actionType, constant, fn) {
    this[constant] = constant;
    if (actionType == constant) {
      fn
    }
  }
};

export default transitions;
