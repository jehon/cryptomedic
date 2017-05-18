
var nb = 0;

let payment = {
  "#Payment_Date": "2003-01-01",
  "#Payment_Amount": "123",
  "select#Payment_ExaminerName": "Shetou",
  "#Payment_Notes": "Created during the test"
};

module.exports = {
  "find the bill": function(client) {
    client
      .page.cryptomedic().authenticate("thierry")

      // Select file
      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      .clearValue("input[ng-model='entryyear']")
      .setValue("input[ng-model='entryyear']", 2014)
      .clearValue("input[ng-model='entryorder']")
      .setValue("input[ng-model='entryorder']", 103)
      .myClick("[ng-click='checkReference()']")

      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "OSMAN")

      .page.cryptomedic().selectFile("Bill", 2)
      .page.cryptomedic().tableIterator('#paymentsList')
        .section('tfoot')
        .row(1).col(2).assert('Total')
        .row(1).col(3).assert('138')
        .endTable()
      ;
  },

  "try to set date in the future": function(client) {
    client
      .myClick("#topsubmenu #button_unlock")
      .waitForElementVisible("#Bill_Date")
      .myFormFillIn("#fileForm", { "#Bill_Date": "2999-01-01"}, "#topsubmenu #button_save")
      .acceptAlert()
      .pause(100)
      .assert.visible("#errorDateFuture")
      .assert.visible("#topsubmenu #button_save")
      .assert.visible("#topsubmenu #button_cancel")
      .myClick("#topsubmenu #button_cancel")
      ;
  },

  "add a payment": function(client) {
    client
      .myFormFillIn("#paymentForm", payment, "#button_payment_create")
      .page.cryptomedic().tableIterator('#paymentsList')
        .row(4).col(1).assert('2003-01-01')
        .nextCol().assert('Shetou')
        .nextCol().assert(123)
        .section('tfoot')
        .row(1).col(2).assert('Total')
        .row(1).col(3).assert('261')
        .endTable()
  },

  "modify a payment": function(client) {
    client
      .click('#button_edit_3')
      ;

    // Check form

    client
      .clearValue('#Payment_Amount')
      .setValue("#Payment_Amount", 456)
      .click('#button_payment_save')
      .page.cryptomedic().myWaitFetch()
      .page.cryptomedic().tableIterator('#paymentsList')
        .row(4).col(1).assert('2003-01-01')
        .nextCol().assert('Shetou')
        .nextCol().assert(456)
        .section('tfoot')
        .row(1).col(2).assert('Total')
        .row(1).col(3).assert('594')
        .endTable()
  },

  "delete a payment": function(client) {
    client
      .click('#button_delete_3')
      .page.cryptomedic().tableIterator('#paymentsList')
        .section('tfoot')
        .row(1).col(2).assert('Total')
        .row(1).col(3).assert('138')
        .endTable()
      ;

  }

};
