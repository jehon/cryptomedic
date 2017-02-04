module.exports = {
  "readPatient2000": function(client) {
    client
      .page.cryptomedic().authenticate("readonly")
      .page.cryptomedic().goPatient(2000, 1)
      .assert.myAssertHashIs("#/folder/1")
      .assert.containsText("#Patient_Name", "rezaul islam")
      .assert.containsText("#Patient_Sex", "Male")
      .assert.containsText("#Patient_District", "Chittagong")
      .assert.containsText("#Patient_Pathology", "ClubFoot")
      .assert.elementNotPresent("#button_edit")

      // Nonrickect Consult
      .page.cryptomedic().selectFile("OtherConsult", 1)
      .assert.containsText("#Date", "2007-01-10")
      .assert.containsText("#ExaminerName", "Ershad")

      .assert.containsText("#Patient_entryyear", "2000")
      .assert.containsText("#Patient_entryorder", "1")

      .assert.containsText("#ds_weight", "0.0 ds")
      .assert.containsText("#ds_height", "0.0 ds")

      .assert.containsText("#wh", "0.22")
      // TODO: .assert.containsText("#ds_wh", "0.00 ds")
      .assert.containsText("#bmi", "16.15")
      .assert.containsText("#ds_bmi", "0.0 ds")
      .assert.elementNotPresent("#button_edit")

      .page.cryptomedic().selectFile("Picture", 2)
      .assert.containsText("#Picture_Date", "2014-11-04")
      .assert.containsText("#Picture_OriginalName", "03.09 a.JPG")
      .assert.containsText("#Picture_file", "10_2014-11-06_15-32-45.JPG")
      .assert.containsText("#Patient_entryyear", "2000")
      .assert.containsText("#Patient_entryorder", "1")
      .assert.elementNotPresent("#button_edit")

      .page.cryptomedic().selectFile("Bill", 1)
      .assert.elementNotPresent("#button_edit")
      // TODO: check bill

      .page.cryptomedic().tableIterator('#paymentsList')
            .col(2).assert('Ershad')
            .nextCol().assert(10)
            .row(2)
            .col(2).assert('Murshed')
            .nextCol().assert(15)
            .endTable()

      .page.cryptomedic().goPatient(2014, 105)
      .assert.containsText("#Patient_Upazilla", "Ukhia")
      .assert.containsText("#Patient_Union_", "Jalia palong")
      .assert.containsText("#Patient_Telephone", "1813247984")

      .page.cryptomedic().selectFile("ClubFoot", 1)
      // .waitForElementVisible("#ageAtConsultationTime")
      .assert.containsText("#ageAtConsultationTime", "2y0m")
      .assert.containsText("#ClubFoot_Treatment", "DB splint")
      // TODO: adapt the data and check them
      .assert.elementNotPresent("#button_edit")

      .page.cryptomedic().goPatient(2001, 1)
      .page.cryptomedic().selectFile("RicketConsult", 3)
      // TODO: adapt the data and check them
      .assert.elementNotPresent("#button_edit")

      .end();
  },
};
