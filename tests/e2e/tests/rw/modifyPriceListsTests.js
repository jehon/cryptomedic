
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
          .row(1)
            .assert("Beginning date")
            .nextCol().assert("2016-01-03")
            .nextCol().assert("2013-01-01")
            .nextCol().assert("")
          .row(4).col(1)
            .assert("")
            .nextCol().assert("Locked")
            .nextCol().assert("Locked")
            .nextCol().assert("Locked")
        .section("tbody")
          .row(1).col(1)
            .assert("consult_CDC_consultation_Bengali_Doctor")
            .nextCol().assert("300")
            .nextCol().assert("300")
            .nextCol().assert("200")
          .nextRow(4).col(1)
            .assert("consult_field_visit")
            .nextCol().assert("-")
            .nextCol().assert("-")
            .nextCol().assert("100")
          .nextRow(7).col(1)
            .assert("other_Other_consultation_care")
            .nextCol().assert("free price")
            .nextCol().assert("free price")
            .nextCol().assert("free price")

        .endTable()

      // Button to create a new price list
      .waitForElementVisible("#button_create")
      .assert.elementNotPresent("#action_creating")
      .myClick("#button_create")

      .end();
  },
};
