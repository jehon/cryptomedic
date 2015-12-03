module.exports = {
  // 'generateReference'; function(client) {

  // },

  'modifyPatient': function(client) {
    var r = Math.floor(Math.random() * 100);

    var ricket_consult = {
      "#Date": "2003-01-01",
      "#Weightkg": "13"
    }

    var picture = {
      "#Picture_Date": "2003-01-02"
    }

    var nonricket_consult = {
      "#Date": "2003-02-01",
      "#Weightkg": "13"
    }

    var clubfoot = {
      "#Date": "2003-04-01",
      "#Weightkg": "13"
    }

    var surgery = {
      "#Surgery_Date": "2003-05-01",
      "#Surgery_ReportDiagnostic": "diagnostique"
    }

    var bill = {
      "#Bill_Date": "2003-06-01"
    }

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
      .myFillInForm('#fileForm', ricket_consult, '#button_save')
      .myCheckForm('#fileForm', ricket_consult)

      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_nonricket_consult")
      .myFillInForm('#fileForm', nonricket_consult, '#button_save')
      .myCheckForm('#fileForm', nonricket_consult)

      // Add a picture -> TODO: add a picture image
      .myClick("#button_add")
      .myClick("#add_picture")
      .waitForElementVisible('#file')
      .setValue('#file', __dirname + '/../../ressources/upload.jpg')
      .myFillInForm('#fileForm', picture, '#button_save')
      // TODO: picture test does not work
      // .myCheckForm('#fileForm', picture)
      // .assert.visible('#img_file')

      // Add a clubfoot
      .myClick("#button_add")
      .myClick("#add_clubfoot")
      .myFillInForm('#fileForm', clubfoot, '#button_save')
      .myCheckForm('#fileForm', clubfoot)

      // Add a surgery
      .myClick("#button_add")
      .myClick("#add_surgery")
      .myFillInForm('#fileForm', surgery, '#button_save')
      .myCheckForm('#fileForm', surgery)

      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")
      .myFillInForm('#fileForm', bill, '#button_save')
      .myCheckForm('#fileForm', bill)

      // Delete all sub-files

      // Not delete
      .myClick("#folder_files .folder_file:nth-child(1) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .dismissAlert()

      // Delete
      .myClick("#folder_files .folder_file:nth-child(6) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(5) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(4) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(3) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(2) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(1) .btn")
      .myClick("#button_edit")
      .myClick("#button_delete")
      .acceptAlert()

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
