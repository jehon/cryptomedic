module.exports = {
  // 'generateReference'; function(client) {

  // },

  "modifyPatient": function(client) {
    // var r = Math.floor(Math.random() * 100);

    var ricket_consult = {
      "#Date": "2003-01-01",
      "#Weightkg": "13"
    };

    var picture = {
      "#Picture_Date": "2003-01-02"
    };

    var other_consult = {
      "#Date": "2003-02-01",
      "#Weightkg": "13"
    };

    var clubfoot = {
      "#Date": "2003-04-01",
      "#Weightkg": "13"
    };

    var surgery = {
      "#Surgery_Date": "2003-05-01",
      "#Surgery_ReportDiagnostic": "diagnostique"
    };

    var appointment = {
      "#Appointment_Nextappointment": "2010-01-01",
      "#Appointment_NextCenter": "Ramu"
    };

    var bill = {
      "#Bill_Date": "2003-06-01"
    };

    client
      .page.cryptomedic().authenticate("murshed")

      // Select file
      .myClick("#menu_home")
      .waitForElementVisible("input[ng-model='entryyear']")
      .clearValue("input[ng-model='entryyear']")
      .setValue("input[ng-model='entryyear']", 2001)
      .clearValue("input[ng-model='entryorder']")
      .setValue("input[ng-model='entryorder']", 4)
      .myClick("[ng-click='checkReference()']")

      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "mozahar ahamed")

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

      // Add a picture
      .myClick("#button_add")
      .myClick("#add_picture")
      .waitForElementVisible('#file')
      .setValue('#file', __dirname + '/../../ressources/upload.jpg')
      .myFillInForm('#fileForm', picture, '#topsubmenu #button_save')

      .myCheckForm('#fileForm', picture)
      .assert.visible('#img_file')

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

      .myClick("#button_add")
      .myClick("#add_appointment")
      .myFillInForm("#fileForm", appointment, "#topsubmenu #button_save")
      .myCheckForm("#fileForm", appointment)

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
      ;

    // Delete
    for(var i = 0; i < 7; i++ ) {
      client
        .myClick("#folder_files .folder_file:nth-child(1) .btn")
        .myClick("#topsubmenu #button_edit")
        .myClick("#topsubmenu #button_delete")
        .acceptAlert();
    }

    client
      // Edit and cancel
      .myClick("#button_patient")
      .myClick("#topsubmenu #patient_edit")
      .waitForElementPresent("#Patient_Name")
      .assert.value("#Patient_Name", "mozahar ahamed")
      .mySelect("#Patient_Pathology", 2)
      .setValue("#Patient_Name", "rezaul")
      .myClick("#topsubmenu #patient_cancel")
      .waitForElementPresent("#Patient_Name")
      .assert.containsText("#Patient_Name", "mozahar ahamed")

      .end();
  }
};
