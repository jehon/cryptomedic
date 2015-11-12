module.exports = {
  'view1': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2000, 1)
        .end();
  },

  'view2': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2014, 107)
        .end();
  },

  'view3': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2014, 103)
        .end();
  },

  'view4': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2014, 104)
        .end();
  },

  'view4': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2014, 105)
        .end();
  },

  'view5': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2014, 105)
        .end();
  },

  'view6': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2001, 1)
        .end();
  },

  'view7': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2001, 4)
        .end();
  },

};
