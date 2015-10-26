module.exports = {
  'view1': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2000, 1)
        .pause(10000)
        .end();
  }
};
