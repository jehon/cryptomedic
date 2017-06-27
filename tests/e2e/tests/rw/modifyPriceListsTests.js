
module.exports = {
  "go to the price page": function(client) {
    client
      .page.cryptomedic().authenticate("thierry")

      // Select file
      .myClick('#menu_more')
      .waitForElementVisible('#menu_prices')
      .myClick("#menu_prices")

      .page.cryptomedic().tableIterator('#price_lists')
        .section("thead")
            .assert("Beginning date")
            .nextCol().assert("2016-01-03")
            .nextCol().assert("2013-01-01")
            .nextCol().assert("")
          .nextRow(4).assert("")
            .nextCol().assert("Locked")
            .nextCol().assert("Locked")
            .nextCol().assert("Locked")
        .section("tbody")
        .endTable()


      // .waitForElementVisible("input[ng-model='entryyear']")
      // .clearValue("input[ng-model='entryyear']")
      // .setValue("input[ng-model='entryyear']", 2014)
      // .clearValue("input[ng-model='entryorder']")
      // .setValue("input[ng-model='entryorder']", 103)
      // .myClick("[ng-click='checkReference()']")

      // .waitForElementPresent("#Patient_Name")
      // .assert.containsText("#Patient_Name", "OSMAN")

      // .page.cryptomedic().selectFile("Bill", 2)
      // .page.cryptomedic().tableIterator('#paymentsList')
      //   .section('tfoot')
      //   .row(1).col(2).assert('Total')
      //   .row(1).col(3).assert('138')
      //   .endTable()
      // ;


      .pause(10000000)
      .end();
  },
};
