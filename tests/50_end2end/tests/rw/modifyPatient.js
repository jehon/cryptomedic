
var nb = 0;

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

var bill2 = {
  "#Bill_Date": "2003-06-01",
  "#Bill_consult_home_visit": 1,
  "#Bill_other_Other_consultation_care": 15
};

var bill2Total = {
  "#total_calculated_raw": 165,
  "#Bill_Sociallevel": 4,
  "#percentage": "100%",
  "#total_calculated_asked": 165
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
      .myForm("#fileForm", ricket_consult, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a non-ricket consult": function(client) {
    client
      // Add a non-ricket consultation
      .myClick("#button_add")
      .myClick("#add_other_consult")
      .myForm("#fileForm", other_consult, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a picture": function(client) {
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
      // Add a clubfoot
    client
      .myClick("#button_add")
      .myClick("#add_clubfoot")
      .myForm("#fileForm", clubfoot, "#topsubmenu #button_save")
      ;
    nb++;
  },

  "add a surgery": function(client) {
    client
      // Add a surgery
      .myClick("#button_add")
      .myClick("#add_surgery")
      .myForm("#fileForm", surgery, "#topsubmenu #button_save")
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
