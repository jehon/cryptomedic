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
      .setValue("input[ng-model='entryyear']", 2001)
      .clearValue("input[ng-model='entryorder']")
      .setValue("input[ng-model='entryorder']", 4)
      .myClick("[ng-click='checkReference()']")
      // .myClick("#button_create_reference")

      // Add a ricket consultation
      .myClick("#button_add")
      .myClick("#add_ricket_consult")
      .myFillInForm("#fileForm", ricket_consult, "#topsubmenu #button_save")

      .myCheckForm("#fileForm", ricket_consult)

      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_other_consult")
      .myFillInForm("#fileForm", other_consult, "#topsubmenu #button_save")
      .myCheckForm("#fileForm", other_consult)

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
      .myFillInForm("#fileForm", clubfoot, "#topsubmenu #button_save")
      .myCheckForm("#fileForm", clubfoot)

      // Add a surgery
      .myClick("#button_add")
      .myClick("#add_surgery")
      .myFillInForm("#fileForm", surgery, "#topsubmenu #button_save")
      .myCheckForm("#fileForm", surgery)

      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")
      .myFillInForm("#fileForm", bill, "#topsubmenu #button_save")
      .myCheckForm("#fileForm", bill)

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
      .mySelect("#Patient_Pathology", 2)
      .setValue("#Patient_Name", "rezaul")
      .myClick("#topsubmenu #patient_cancel")
      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "rezaul" + r)

      // Delete the file
      .myClick("#topsubmenu #patient_edit")
      .myClick("#topsubmenu #patient_delete")
      .acceptAlert()

      .end();
  }
};
