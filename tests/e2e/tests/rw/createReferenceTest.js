module.exports = {
  // 'generateReference'; function(client) {

  // },

  "createReference": function(client) {
    var r = Math.floor(Math.random() * 100);

    client
      .page.cryptomedic().authenticate("murshed")

      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      .clearValue("input[ng-model='entryyear']")
      .setValue("input[ng-model='entryyear']", 1999)
      .clearValue("input[ng-model='entryorder']")
      .setValue("input[ng-model='entryorder']", 104)
      .myClick("[ng-click='checkReference()']")
      .waitForElementVisible("#button_create_reference", 5000, "The patient '1999-104' could not be created by reference. Does it already exists? Please delete it then...")
      .myClick("#button_create_reference")

      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_entryyear", 1999)
      .assert.containsText("#Patient_entryorder", 104)

      .setValue("#Patient_Name", "rezaul" + r)
      .myClick("#topsubmenu #patient_save")

      // Delete the file
      .myClick("#topsubmenu #patient_edit")
      .myClick("#topsubmenu #patient_delete")
      .acceptAlert()
      .waitForElementVisible("#page_home")
      // .pause(500)
      .assert.myAssertHashIs("#/home")
      .end();
  }
};
