module.exports = {
  "tags": [ "readonly", "reports" ],
  "reportSurgical": function(client) {
    client
        .page.cryptomedic().authenticate("readonly")
        .page.cryptomedic().report("surgical", { "month": "2014-01" })
    .assert.myAssertCell("#report_table table", 1, 4, "Ukhia")
    .assert.myAssertCell("2014-104")
    .end();
  }
};
