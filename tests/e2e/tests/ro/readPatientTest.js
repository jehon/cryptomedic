module.exports = {
    readPatient2000: function (client) { // id: 1
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().goPatient(2000, 1);
        client.assert.myAssertHashIs('#/folder/1');
        client.assert.containsText('#Patient_Name', 'rezaul islam');
        client.assert.containsText('#Patient_Sex', 'Male');
        client.assert.containsText('#Patient_District', 'Chittagong');
        client.assert.containsText('#Patient_Pathology', 'ClubFoot');
        client.assert.not.elementPresent('#button_edit');

        client.myScreenshotReference('patient');

        // Summary
        client.myClick('#summary');
        client.page.cryptomedic().tableIterator('#table_summary')
            // Summary Bill#1
            .row(5).assert('#3')
            .col(4).assert('Sociallevel')
            .endTable();
        client.myScreenshotReference('summary');

        // Nonrickect Consult
        client.page.cryptomedic().selectFile('OtherConsult', 1);
        client.assert.containsText('#Date', '2007-01-10');
        client.assert.containsText('#ExaminerName', 'Ershad');

        client.assert.elementPresent('x-ff-patient-related');
        client.assert.elementPresent('x-ff-patient-related[patient-entry-number="2000-1"]');

        client.assert.containsText('x-fff-weight-sd', '0 ds');
        client.assert.containsText('x-fff-height-sd', '0 ds');

        client.assert.containsText('x-fff-wh', '0.22');
        client.assert.containsText('x-fff-wh-sd', 'Some data is out-of-bounds');

        client.assert.containsText('x-fff-bmi', '16.2');
        client.assert.containsText('x-fff-bmi-sd', '0 ds');

        client.assert.not.elementPresent('#button_edit');
        client.myScreenshotReference('OtherConsult');

        client.page.cryptomedic().selectFile('Picture', 2);
        client.assert.not.elementPresent('#button_edit');
        client.assert.containsText('#Picture_Date', '2014-11-04');
        client.assert.containsText('#Picture_file', '10_2014-11-06_15-32-45.JPG');
        client.waitForElementVisible('#img_file');
        client.myScreenshotReference('Picture');

        client.page.cryptomedic().selectFile('Bill', 1);
        client.assert.not.elementPresent('#button_edit');
        client.assert.containsText('#Bill_Date', '2011-06-09');
        client.myScreenshotReference('Bill');
        // TODO: check bill

        client.page.cryptomedic().selectFile('Surgery', 5);
        client.assert.containsText('#Surgery_ReportDiagnostic', 'test');
        client.assert.containsText('#Surgery_FollowUpComplication', 'nothing');
        client.myScreenshotReference('Surgery');
    },
    readPatient5: function (client) { // id: 5
        client.page.cryptomedic().goPatient(2014, 105);
        client.assert.containsText('#Patient_Upazilla', 'Ukhia');
        client.assert.containsText('#Patient_Union_', 'Jalia palong');
        client.assert.containsText('#Patient_Telephone', '1813247984');

        client.page.cryptomedic().selectFile('ClubFoot', 1);
        client.waitForElementVisible('#ageAtConsultationTime');
        client.assert.containsText('#ageAtConsultationTime', '2y0m');
        client.assert.containsText('#ClubFoot_Treatment', 'DB splint');
        // TODO: adapt the data and check them
        client.assert.not.elementPresent('#button_edit');
        client.myScreenshotReference('ClubFoot');
        client.end();
    },

    readPatient6: function (client) { // id: 6
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().goPatient(2001, 1);
        client.page.cryptomedic().selectFile('RicketConsult', 3);
        // TODO: adapt the data and check them
        client.assert.not.elementPresent('#button_edit');
        client.assert.containsText('#Date', '2004-10-06');
        client.myScreenshotReference('RicketConsult');
        client.end();
    },

    readPatient3: function (client) {
        client.page.cryptomedic().authenticate('readonly');
        client.page.cryptomedic().goPatient(2014, 103);
        client.page.cryptomedic().selectFile('Bill', 2);
        client.page.cryptomedic().tableIterator('#paymentsList')
            .col(2).assert('Murshed')
            .nextCol().assert(15)
            .row(2)
            .col(2).assert('Ershad')
            .nextCol().assert(10)
            .endTable();
        client.myScreenshotReference('Bill');
        client.end();
    }
};
