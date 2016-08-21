
var nb = 0;

var appointment = {
  "#Appointment_Nextappointment": "2010-01-01",
  "#Appointment_NextCenter": "Ramu"
};

module.exports = {
  // 'generateReference'; function(client) {

  // },

  "modify a Patient": function(client) {
    // var r = Math.floor(Math.random() * 100);
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
      ;
  },

  "add_a ricket_consult": function(client) {
    client
      // Add a ricket consultation
      .myClick("#button_add")
      .myClick("#add_ricket_consult")
      .myForm("#fileForm", {
        "#Date": "2003-01-01",
        "#Weightkg": "13"
      }, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a non-ricket consult": function(client) {
    client
      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_other_consult")
      .myForm("#fileForm", {
        "#Date": "2003-02-01",
        "#Weightkg": "13"
      }, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a picture": function(client) {
    var picture = {
      "#Picture_Date": "2003-01-02"
    };

    client
      // Add a picture
      .myClick("#button_add")
      .myClick("#add_picture")
      .waitForElementVisible('#file')
      .setValue('#file', __dirname + '/../../ressources/upload.jpg')
      .myForm("#fileForm", picture, "#topsubmenu #button_save")
      .assert.visible('#img_file')
      ;
    nb++;
  },

  "add a club foot": function(client) {
    client
      .myClick("#button_add")
      .myClick("#add_clubfoot")
      .myForm("#fileForm", {
        "#Date": "2003-04-01",
        "#Weightkg": "13"
      }, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a surgery": function(client) {
    client
      // Add a surgery
      .myClick("#button_add")
      .myClick("#add_surgery")
      .myForm("#fileForm", {
        "#Surgery_Date": "2003-05-01",
        "#Surgery_ReportDiagnostic": "diagnostique"
      }, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add an appointement": function(client) {
    client
      // Add a appointment
      .myClick("#button_add")
      .myClick("#add_appointment")
      .myForm("#fileForm", appointment, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a bill": function(client) {
    var bill = {
      "#Bill_Date": "2003-06-01",
      "#Bill_consult_home_visit": 1,
      "#Bill_other_Other_consultation_care": 15
    };

    var billTotal = {
      "#total_calculated_raw": 165,
      "#Bill_Sociallevel": 4,
      "#percentage": "100%",
      "#total_calculated_asked": 165
    };

    client
      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")

      .myFormFillIn("#fileForm", bill)
      .myFormCheck("#fileForm", billTotal)
      .assert.elementNotPresent("#Bill_other_Other_plaster")

      .myClick("#topsubmenu #button_save")
      .myFormCheck("#fileForm", bill)
      .myFormCheck("#fileForm", billTotal)
      .assert.elementNotPresent("#Bill_other_Other_plaster")
      ;
    nb++;
  },

  "add a bill 2": function(client) {
    var bill = {
      "#Bill_Date": "2003-06-01",
      "#Bill_consult_home_visit": 1,
      "#Bill_other_Other_consultation_care": 15,
      "#Bill_sl_familySalary": 3000,
      "#Bill_sl_numberOfHouseholdMembers": 5
    };

    var billTotal = {
      "#total_calculated_raw": 165,
      "#salary_ratio": 600,
      "#Bill_Sociallevel": 2,
      "#percentage": "30%",
      "#total_calculated_asked": (165 * 0.3)
    };

    client
      // Add a bill
      .myClick("#button_add")
      .myClick("#add_bill")

      .myFormFillIn("#fileForm", bill)
      .myFormCheck("#fileForm", billTotal)
      .assert.elementNotPresent("#Bill_other_Other_plaster")

      .myClick("#topsubmenu #button_save")
      .myFormCheck("#fileForm", bill)
      .myFormCheck("#fileForm", billTotal)
      .assert.elementNotPresent("#Bill_other_Other_plaster")
      ;
    nb++;
  },

  // "check the created appointment": function(client) {
  //   client
  //     .waitForElementVisible("")
  //     .assert.containsText("", appointment["#Appointment_Nextappointment"])
  //     ;
  // },

  "Delete a file but not confirm it": function(client) {
    client
      .myClick("#folder_files .folder_file:nth-child(1) .btn")
      .myClick("#topsubmenu #button_edit")
      .myClick("#topsubmenu #button_delete")
      .dismissAlert()
      ;
  },

  "Delete all sub-files": function(client) {
    for(var i = 0; i < nb; i++ ) {
      client
        .myClick("#folder_files .folder_file:nth-child(1) .btn")
        .myClick("#topsubmenu #button_edit")
        .myClick("#topsubmenu #button_delete")
        .acceptAlert();
    }
  },

  "edit and cancel patient": function(client) {
    client
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
