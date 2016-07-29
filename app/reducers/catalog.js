
let catalog = {
  _define: function(constant) {
    catalog[constant] = constant;
    return constant;
  }
};

export default catalog;
