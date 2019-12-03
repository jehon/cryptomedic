module.exports = {
	'readPatient2000': function(client) {
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
		client.myScreenshotReference('summary');
		client.page.cryptomedic().tableIterator('#table_summary')
			// Summary Bill#1
			.row(4).assert('#2')
			.col(4).assert('Sociallevel')
			.endTable();

		// Nonrickect Consult
		client.page.cryptomedic().selectFile('OtherConsult', 1);
		client.myScreenshotReference('OtherConsult');
		client.assert.containsText('#Date', '2007-01-10');
		client.assert.containsText('#ExaminerName', 'Ershad');

		client.assert.containsText('#Patient_entryyear', '2000');
		client.assert.containsText('#Patient_entryorder', '1');

		client.assert.containsText('#ds_weight', '0.0 ds');
		client.assert.containsText('#ds_height', '0.0 ds');

		client.assert.containsText('#wh', '0.22');
		// TODO: .assert.containsText("#ds_wh", "0.00 ds")
		client.assert.containsText('#bmi', '16.15');
		client.assert.containsText('#ds_bmi', '0.0 ds');
		client.assert.not.elementPresent('#button_edit');

		client.page.cryptomedic().selectFile('Picture', 2);
		client.myScreenshotReference('Picture');
		client.assert.containsText('#Picture_Date', '2014-11-04');
		client.assert.containsText('#Picture_file', '10_2014-11-06_15-32-45.JPG');
		client.assert.containsText('#Patient_entryyear', '2000');
		client.assert.containsText('#Patient_entryorder', '1');
		client.assert.not.elementPresent('#button_edit');

		client.page.cryptomedic().selectFile('Bill', 1);
		client.assert.not.elementPresent('#button_edit');
		// TODO: check bill
	},
	readPatient5: function(client) {
		client.page.cryptomedic().goPatient(2014, 105);
		client.assert.containsText('#Patient_Upazilla', 'Ukhia');
		client.assert.containsText('#Patient_Union_', 'Jalia palong');
		client.assert.containsText('#Patient_Telephone', '1813247984');

		client.page.cryptomedic().selectFile('ClubFoot', 1);
		client.myScreenshotReference('ClubFoot');
		client.waitForElementVisible('#ageAtConsultationTime');
		client.assert.containsText('#ageAtConsultationTime', '2y0m');
		client.assert.containsText('#ClubFoot_Treatment', 'DB splint');
		// TODO: adapt the data and check them
		client.assert.not.elementPresent('#button_edit');

		client.page.cryptomedic().goPatient(2001, 1);
		client.page.cryptomedic().selectFile('RicketConsult', 3);
		client.myScreenshotReference('RicketConsult');
		// TODO: adapt the data and check them
		client.assert.not.elementPresent('#button_edit');

		client.end();
	},

	readPatient3: function(client) {
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
		client.end();
	}
};
