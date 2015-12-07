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
      .waitForElementPresent("#Patient_Name")
      .setValue("#Patient_Name", "rezaul" + r)

      // Validation fail
      .acceptAlert()
      .assert.visible("#patient_save")

      // Add ricket to pass the validation
      .click("#Patient_pathology_Ricket")
      .myClick("#topsubmenu #patient_save")
      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "rezaul" + r)
      .assert.visible("#Patient_pathology_Ricket_ok")

      // Add a ricket consultation
      .myClick("#button_add")
      .myClick("#add_ricket_consult")
      .myFillInForm('#fileForm', ricket_consult, '#topsubmenu #button_save')
      .myCheckForm('#fileForm', ricket_consult)

      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_nonricket_consult")
      .myFillInForm('#fileForm', nonricket_consult, '#topsubmenu #button_save')
      .myCheckForm('#fileForm', nonricket_consult)

      // Add a picture -> TODO: add a picture image
      // .myClick("#button_add")
      // .myClick("#add_picture")
      // .waitForElementVisible('#file')
      // .setValue('#file', __dirname + '/../../ressources/upload.jpg')
      // .myFillInForm('#fileForm', picture, '#button_save')
      // TODO: picture test does not work
      // .myCheckForm('#fileForm', picture)
      // .assert.visible('#img_file')

      // Add a clubfoot
      .myClick("#button_add")
      .myClick("#add_clubfoot")
      .myFillInForm('#fileForm', clubfoot, '#topsubmenu #button_save')
      .myCheckForm('#fileForm', clubfoot)

      // Add a surgery
      .myClick("#button_add")
      .myClick("#add_surgery")
      .myFillInForm('#fileForm', surgery, '#topsubmenu #button_save')
      .myCheckForm('#fileForm', surgery)

      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")
      .myFillInForm('#fileForm', bill, '#topsubmenu #button_save')
      .myCheckForm('#fileForm', bill)

      // Delete all sub-files

      // Not delete
      .myClick("#folder_files .folder_file:nth-child(1) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .dismissAlert()

      // // Delete
      // .myClick("#folder_files .folder_file:nth-child(6) .btn")
      // .myClick("#topsubmenu #button_edit")
      // .myClick("#topsubmenu #button_delete")
      // .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(5) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(4) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(3) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(2) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .acceptAlert()

      .myClick("#folder_files .folder_file:nth-child(1) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .acceptAlert()

      // Edit and cancel
      .myClick("#button_patient")
      .myClick("#topsubmenu #patient_edit")
      .waitForElementPresent("#Patient_Name")
      .assert.value("#Patient_Name", "rezaul" + r)
      .click("#Patient_pathology_Ricket")
      .setValue("#Patient_Name", "rezaul")
      .myClick("#topsubmenu #patient_cancel")
      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "rezaul" + r)

      // Delete the file
      .myClick("#topsubmenu #patient_edit")
      .myClick("#topsubmenu #patient_delete")
      .acceptAlert()

      .end();
  },
}
