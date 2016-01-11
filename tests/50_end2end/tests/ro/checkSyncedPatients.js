module.exports = {
  "viewAllSyncedPatients": function(client) {
    client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().goPatient(2000, 1)
        .page.cryptomedic().goPatient(2014, 107)
        .page.cryptomedic().goPatient(2014, 103)
        .page.cryptomedic().goPatient(2014, 104)
        .page.cryptomedic().goPatient(2014, 105)
        .page.cryptomedic().goPatient(2001, 1)
        .page.cryptomedic().goPatient(2001, 4)
        .end();
  }
};
