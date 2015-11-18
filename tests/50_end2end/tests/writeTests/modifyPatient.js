module.exports = {
  // 'generateReference'; function(client) {

  // },

  'modifyPatient': function(client) {
    var r = Math.floor(Math.random() * 100);

    client
      .page.cryptomedic().authenticate("murshed")

      .myClick("#menu_home")
      .waitForElementVisible('input[ng-model="entryyear"]')
      .clearValue('input[ng-model="entryyear"]')
      .setValue('input[ng-model="entryyear"]', 2015)
      .clearValue('input[ng-model="entryorder"]')
      .setValue('input[ng-model="entryorder"]', 1)
      .myClick('[ng-click="checkReference()"]')
      .myClick('#button_create_reference')

      // Edit and save
      .waitForElementPresent("#Patient_Firstname")
      .setValue("#Patient_Firstname", "rezaul" + r)

      // Validation fail
      .acceptAlert()
      .assert.visible("#patient_save")

      // Add ricket to pass the validation
      .click("#Patient_pathology_Ricket")
      .myClick("#patient_save")
      .waitForElementPresent("#Patient_Firstname")
      .assert.containsText("#Patient_Firstname", "rezaul" + r)
      .assert.visible("#Patient_pathology_Ricket_ok")

      // Add a ricket consultation
      .myClick("#button_add")
      .myClick("#add_ricket_consult")
      .clearValue("#Weightkg")
      .setValue("#Weightkg", "13")
      .clearValue("#Date")
      .setValue("#Date", "2003-01-01")
      .myClick("#button_save")

      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_nonricket_consult")

      // Add a picture
      .myClick("#button_add")
      .myClick("#add_picture")

      // Add a clubfoot
      .myClick("#button_add")
      .myClick("#add_clubfoot")

      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")

      // Delete all sub-files


      // Edit and cancel
      .myClick("#button_patient")
      .myClick("#patient_edit")
      .waitForElementPresent("#Patient_Firstname")
      .assert.value("#Patient_Firstname", "rezaul" + r)
      .click("#Patient_pathology_Ricket")
      .setValue("#Patient_Firstname", "rezaul")
      .myClick("#patient_cancel")
      .waitForElementPresent("#Patient_Firstname")
      .assert.containsText("#Patient_Firstname", "rezaul")

      // Delete the file
      .myClick("#patient_edit")
      .myClick("#patient_delete")
      .acceptAlert()

      .end();
  },
}
