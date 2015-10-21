module.exports = {
  'searchPatient2000': function(client) {
      client
        .page.cryptomedic().authenticate("readonly")
        .myClick("#menu_search")
        .waitForElementPresent(".searchFields", 1000)
        .setValue("#Patient_entryyear", 2000)
        .myClick("#button_submit")
        .waitForElementPresent("#search_results", 1000)
        .assert.myAssertTableCountRows("#search_results", 1)
        .myClick("#search_results tbody tr:nth-child(1) td:nth-child(1) img")
        .assert.myAssertHashIs("#/folder/1")
        .end();
  }
};
