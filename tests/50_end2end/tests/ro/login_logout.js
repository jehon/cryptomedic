module.exports = {
  "authenticate_multiple": function(client) {
    client
      .page.cryptomedic().authenticate("readonly")
      .myClick("#logout")
      .page.cryptomedic().authenticate("readonly")
      .end();
  },
};
