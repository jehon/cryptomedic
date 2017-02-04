
var nb = 0;

let payment = {
  "#Payment_Date": "2003-01-01",
  "#Payment_Amount": "123",
  "select#Payment_ExaminerName": "Shetou",
};

module.exports = {
  "find the bill": function(client) {
    client
      .page.cryptomedic().authenticate("murshed")

      // Select file
      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      .clearValue("input[ng-model='entryyear']")
      .setValue("input[ng-model='entryyear']", 2000)
      .clearValue("input[ng-model='entryorder']")
      .setValue("input[ng-model='entryorder']", 1)
      .myClick("[ng-click='checkReference()']")

      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "rezaul islam")

      .page.cryptomedic().selectFile("Bill", 1)
      ;
  },

  "add a payment": function(client) {
    client
      .myFormFillIn("#paymentForm", payment, "#button_payment_create")
      .page.cryptomedic().tableIterator('#paymentsList')
        .row(3).col(1).assert('2003-01-01')
        .nextCol().assert('Shetou')
        .nextCol().assert(123)
  },

  "modify a payment": function(client) {
    client
      .click('#button_edit_2')
      ;

    // Check form

    client
      .clearValue('#Payment_Amount')
      .setValue("#Payment_Amount", 456)
      .click('#button_payment_save')
      .page.cryptomedic().myWaitFetch()
      .page.cryptomedic().tableIterator('#paymentsList')
        .row(3).col(1).assert('2003-01-01')
        .nextCol().assert('Shetou')
        .nextCol().assert(456)
  },

  "delete a payment": function(client) {
    client
      .click('#button_delete_2')
      ;

  }

};
