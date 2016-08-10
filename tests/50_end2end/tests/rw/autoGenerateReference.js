module.exports = {

  "autoGenerateReference": function(client) {
    var r = Math.floor(Math.random() * 100);

    client
      .page.cryptomedic().authenticate("murshed")

      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      // .clearValue("input[ng-model='entryyear']")
      // .setValue("input[ng-model='entryyear']", 2015)
      // .clearValue("input[ng-model='entryorder']")
      // .setValue("input[ng-model='entryorder']", 1)
      // .myClick("[ng-click='checkReference()']")
      .myClick("#button_generate_reference")

      // Check file
      .waitForElementPresent("#Patient_Name")
      // .assert.containsText("#Patient_entryyear", 2015)
      // .assert.containsText("#Patient_entryorder", 1)

      // Edit and save
      .setValue("#Patient_Name", "rezaul" + r)

      // Validation fail
      .acceptAlert()
      .assert.visible("#patient_save")

      // Add ricket to pass the validation
      .mySelect("#Patient_Pathology", 1)
      .myClick("#topsubmenu #patient_save")
      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "rezaul" + r)
      .assert.containsText("#Patient_Pathology", "Ricket")

      .myClick("#topsubmenu #patient_edit")
      .waitForElementNotVisible("#busy")

      .myClick("#topsubmenu #patient_delete")
      .acceptAlert()

      .waitForElementNotVisible("#busy")

      .assert.myAssertHashIs("#/home")

      .end();
  }
};
