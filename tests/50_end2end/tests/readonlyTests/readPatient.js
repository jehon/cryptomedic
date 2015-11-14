module.exports = {
  'readPatient2000': function(client) {
    client
      .page.cryptomedic().authenticate("readonly")
      .page.cryptomedic().goPatient(2000, 1)
      .assert.myAssertHashIs("#/folder/1")
      .assert.containsText("#Patient_Firstname", "rezaul")
      .assert.containsText("#Patient_Lastname", "islam")
      .assert.containsText("#Patient_Sex", "Male")
      .assert.containsText("#Patient_District", "Chittagong")
      .assert.visible("#Patient_pathology_Clubfoot_ok")
      .assert.visible("#Patient_pathology_Ricket_ko")

      // Nonrickect Consult
      .page.cryptomedic().selectFile("NonricketConsult", 1)
      .assert.containsText("#Date", "2007-09-21")
      .assert.containsText("#ExaminerName", "Ershad")

      .assert.containsText("#Patient_entryyear", "2000")
      .assert.containsText("#Patient_entryorder", "1")

      .assert.containsText("#ds_weight", "0.0 ds")
      .assert.containsText("#ds_height", "0.0 ds")

      .assert.containsText("#wh", "0.22")
      // TODO: .assert.containsText("#ds_wh", "0.00 ds")
      .assert.containsText("#bmi", "16.15")
      .assert.containsText("#ds_bmi", "0.0 ds")

      .page.cryptomedic().selectFile("Picture", 2)
      .assert.containsText("#Picture_Date", "2014-11-04")
      .assert.containsText("#Picture_OriginalName", "03.09 a.JPG")
      .assert.containsText("#Picture_file", "10_2014-11-06_15-32-45.JPG")
      .assert.containsText("#Patient_entryyear", "2000")
      .assert.containsText("#Patient_entryorder", "1")

      .page.cryptomedic().selectFile("Bill", 1)
      // TODO: check bill

      .page.cryptomedic().goPatient(2014, 105)
      .assert.containsText("#Patient_Upazilla", "Ukhia")
      .assert.containsText("#Patient_Union_", "Jalia palong")
      .assert.containsText("#Patient_Telephone", "1813247984")

      .page.cryptomedic().selectFile("ClubFoot", 1)
      .assert.containsText("#ageAtConsultationTime", "2 years old at consultation time")
      .assert.containsText("#ClubFoot_Treatment", "DB splint")
      // TODO: adapt the data and check them

      .page.cryptomedic().goPatient(2001, 1)
      .page.cryptomedic().selectFile("RicketConsult", 3)
      // TODO: adapt the data and check them

      .end();
  },
}
