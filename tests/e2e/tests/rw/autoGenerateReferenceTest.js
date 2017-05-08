module.exports = {

  "autoGenerateReference": function(client) {
    client
      .page.cryptomedic().authenticate("murshed")

      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      .myClick("#button_generate_reference")
      .waitForElementPresent("#Patient_Name")

      // // Edit and save
      .setValue("#Patient_entryyear", 1998)
      .setValue("#Patient_Name", "rezaul")
      .myClick("#bottomsubmenu #patient_create")

      .pause(1000)

      .assert.containsText("#Patient_entryyear", 1998)
      .assert.containsText("#Patient_Name", "rezaul")
      .assert.containsText("#Patient_entryorder", 10000) // Should be above 10000 as automatically generated

      .myClick("#topsubmenu #patient_edit")
      .myClick("#topsubmenu #patient_delete")
      .acceptAlert()
      .waitForElementVisible("#page_home")
      // .pause(500)
      .assert.myAssertHashIs("#/home")

      .end();
  }
};
