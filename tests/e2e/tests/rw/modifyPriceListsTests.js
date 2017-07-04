
let assert = require("assert");

function assertTableInitial(client, i = 0) {
  assert(client != null);
  client
    .page.cryptomedic().tableIterator('#price_lists')
      .section("thead")
        .row(1)
          .col(1)
          .assert("Beginning date")
          .col(1 + i)
          .nextCol().assert("2016-01-03")
          .nextCol().assert("2013-01-01")
          .nextCol().assert("")
        .row(4).col(1)
          .assert("")
          .col(1 + i)
          .nextCol().assert("Locked")
          .nextCol().assert("Locked")
          .nextCol().assert("Locked")
      .section("tbody")
        .row(1).col(1)
          .assert("consult_CDC_consultation_Bengali_Doctor")
          .col(1 + i)
          .nextCol().assert("300")
          .nextCol().assert("300")
          .nextCol().assert("200")
        .nextRow(4).col(1)
          .assert("consult_field_visit")
          .col(1 + i)
          .nextCol().assert("-")
          .nextCol().assert("-")
          .nextCol().assert("100")
        .nextRow(7).col(1)
          .assert("other_Other_consultation_care")
          .col(1 + i)
          .nextCol().assert("open")
          .nextCol().assert("open")
          .nextCol().assert("open")
      .endTable()
    .assert.elementNotPresent("#button_save_" + (i))
    .assert.elementNotPresent("#button_save_" + (i + 1))
    .assert.elementNotPresent("#button_save_" + (i + 2))
}

module.exports = {
  "go to the price page": function(client) {
    client
      .page.cryptomedic().authenticate("thierry")

      // Select file
      .myClick('#menu_more')
      .waitForElementVisible('#menu_prices')
      .myClick("#menu_prices")
      .page.cryptomedic().myWaitFetch();

    assertTableInitial(client);
  },

  "create a new Price List": function(client) {
    client
      // Button to create a new price list
      .waitForElementVisible("#button_create")
      .assert.elementNotPresent("#action_creating")
      .myClick("#button_create")

      .waitForElementVisible("#action_creating")
      .assert.visible("#form_creating input[name=pivotDate]")

      .myFormFillIn('#form_creating', { '[name=pivotDate]': '2010-01-01' }, "#button_do_create")

      .waitForElementVisible("#error_date")

      .myFormFillIn('#form_creating', { '[name=pivotDate]': '2030-01-01' }, "#button_do_create")
      .pause(10)

      .waitForElementNotPresent("#error_date")
      .waitForElementNotPresent("#button_create")
      .waitForElementNotPresent("#action_creating")
  },

  "edit the created price list, but not saving": function(client) {
    client
      .waitForElementVisible("#button_save_0")
      .waitForElementVisible("#button_cancel_0")
      .assert.elementNotPresent("#button_edit_0")
      .page.cryptomedic().tableIterator('#price_lists')
        .section("tbody")
          .col(2)
            .row(1)   
              .assert(false, "input[name='consult_CDC_consultation_Bengali_Doctor_radio'][value='0'][checked]")
              .assert(false, "input[name='consult_CDC_consultation_Bengali_Doctor'][value='300']")
            .nextRow()
              .assert(false, "input[name='consult_CDC_consultation_Doctor_radio'][value='-1'][checked]")
            .nextRow()
              .assert(false, "input[name='consult_CDC_consultation_physio_radio'][value='0'][checked]")
              .assert(false, "input[name='consult_CDC_consultation_physio'][value='100']")
            .nextRow()
              .assert(false, "input[name='consult_ClubFoot_Follow_up_radio'][value='0'][checked]")
              .assert(false, "input[name='consult_ClubFoot_Follow_up'][value='100']")
            .row(12)
              .assert(false, "input[name='other_Other_consultation_care_radio'][value='1'][checked]")
        .endTable()

      // TODO: edit values (2 first lines)

      .myFormFillIn("#price_lists", {
        '[name=consult_CDC_consultation_Bengali_Doctor]': 123,
        '[name=consult_ClubFoot_Follow_up]': 123
        // '[name=consult_CDC_consultation_Doctor]': 123
      })

      .myClick("#button_cancel_0")
      .pause(10)
      .page.cryptomedic().myWaitFetch()

      .page.cryptomedic().tableIterator('#price_lists')
        .section("tbody")
          .col(2)
            .row(1)   .assert("300")
            .nextRow().assert("-")
            .nextRow().assert("100")
            .nextRow().assert("100")
            .row(12).assert("open")
  },

  "edit the created price list": function(client) {
    // client
    //   .myClick("#button_edit_0")
    //   .page.cryptomedic().myWaitFetch()
    //         
  },

  "delete the created price list": function(client) {
    client
      .waitForElementPresent("#button_delete_0")
      .myClick("#button_delete_0")
      .page.cryptomedic().myWaitFetch()
      ;

    assertTableInitial(client);

    client
      .end()
      ;
  }
};
