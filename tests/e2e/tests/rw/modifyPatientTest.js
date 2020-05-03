/* eslint-env node */
var nb = 0;

module.exports = {
    'modify a Patient': function (client) {
        client.page.cryptomedic().authenticate('murshed');

        // Select file (id: 7)
        client.myClick('#menu_home');
        client.waitForElementVisible('input[ng-model="entryyear"]');
        client.clearValue('input[ng-model="entryyear"]');
        client.setValue('input[ng-model="entryyear"]', 2001);
        client.clearValue('input[ng-model="entryorder"]');
        client.setValue('input[ng-model="entryorder"]', 4);
        client.myClick('[ng-click="checkReference()"]');

        client.waitForElementPresent('#Patient_Name');
        client.assert.containsText('#Patient_Name', 'mozahar ahamed');
    },

    'add_a ricket_consult': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_ricket_consult');
        client.myForm('#fileForm', {
            '#Date': '2003-01-01',
            '#Weightkg': '13'
        }, '#topsubmenu #button_save');
        nb++;
    },

    'add a other-consult': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_other_consult');
        client.myForm('#fileForm', {
            '#Date': '2003-03-02',
            '#Weightkg': '13'
        }, '#topsubmenu #button_save');
        nb++;
    },

    'add a club foot': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_clubfoot');
        client.myForm('#fileForm', {
            '#Date': '2003-04-01',
            '#Weightkg': '13'
        }, '#topsubmenu #button_save');
        nb++;
    },

    'add a surgery': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_surgery');
        client.myForm('#fileForm', {
            '#Surgery_Date': '2003-05-01',
            '#Surgery_ReportDiagnostic': 'diagnostique'
        }, '#topsubmenu #button_save');
        nb++;
    },

    'add an appointement': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_appointment');
        client.myForm('#fileForm', {
            '#Appointment_Nextappointment': '2010-01-01',
            '[name=NextCenter]': { value: 'Ramu' },
        }, '#topsubmenu #button_save');
        nb++;
    },

    'add a bill': function (client) {
        var bill = {
            '#Bill_Date': '2003-06-01',
            '#Bill_consult_home_visit': 1,
            '#Bill_other_Other_consultation_care': 15
        };

        var billTotal = {
            '#total_calculated_raw': 165,
            '#Bill_Sociallevel': 4,
            '#percentage': '100%',
            '#total_calculated_asked': 165
        };

        client.myClick('#button_add');
        client.myClick('#add_bill');

        client.myFormFillIn('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.not.elementPresent('#Bill_other_Other_plaster');

        client.myClick('#topsubmenu #button_save');
        client.myFormCheck('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.not.elementPresent('#Bill_other_Other_plaster');
        nb++;
    },

    'add a bill with no date, no price': function (client) {
        client.myClick('#button_add');
        client.myClick('#add_bill');
        client.myFormFillIn('#fileForm', { '#Bill_Date': '' });

        client.assert.not.elementPresent('[priceFor]');
        client.assert.elementPresent('#errorNoDate');
        client.myClick('#topsubmenu #button_cancel');
    },

    'add a bill 2': function (client) {
        var bill = {
            '#Bill_Date': '2003-06-01',
            '#Bill_consult_home_visit': 1,
            '#Bill_other_Other_consultation_care': 15,
            '#Bill_sl_familySalary': 3000,
            '#Bill_sl_numberOfHouseholdMembers': 5
        };

        var billTotal = {
            '#total_calculated_raw': 165,
            '#salary_ratio': 600,
            '#Bill_Sociallevel': 2,
            '#percentage': '30%',
            '#total_calculated_asked': Math.round(165 * 0.3)
        };

        client.myClick('#button_add');
        client.myClick('#add_bill');

        client.myFormFillIn('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.not.elementPresent('#Bill_other_Other_plaster');

        client.myClick('#topsubmenu #button_save');
        client.myFormCheck('#fileForm', bill);

        client.myFormCheck('#fileForm', billTotal);
        client.assert.not.elementPresent('#Bill_other_Other_plaster');
        nb++;
    },

    'add a bill 3': function (client) {
        var bill = {
            '#Bill_Date': '2016-06-01',
            '#Bill_consult_home_visit': 1,
            '#Bill_other_Other_consultation_care': 15,
            '#Bill_sl_familySalary': 3000,
            '#Bill_sl_numberOfHouseholdMembers': 5
        };

        var billTotal = {
            '#total_calculated_raw': 165,
            '#salary_ratio': 600,
            '#Bill_Sociallevel': 2,
            '#percentage': '40%',
            '#total_calculated_asked': Math.round(165 * 0.4)
        };

        client.myClick('#button_add');
        client.myClick('#add_bill');

        client.myFormFillIn('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.elementPresent('#Bill_other_Other_plaster');

        client.myClick('#topsubmenu #button_save');
        client.myFormCheck('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.elementPresent('#Bill_other_Other_plaster');
        nb++;
    },

    'add a bill with direct payment': function (client) {
        var bill = {
            '#Bill_Date': '2016-06-01',
            '#Bill_consult_home_visit': 1,
            '#Bill_other_Other_consultation_care': 15,
            '#Bill_sl_familySalary': 3000,
            '#Bill_sl_numberOfHouseholdMembers': 5
        };

        var billTotal = {
            '#total_calculated_raw': 165,
            '#salary_ratio': 600,
            '#Bill_Sociallevel': 2,
            '#percentage': '40%',
            '#total_calculated_asked': Math.round(165 * 0.4)
        };

        client.myClick('#button_add');
        client.myClick('#add_bill');

        client.myFormFillIn('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.elementPresent('#Bill_other_Other_plaster');
        client.setValue('#fileForm #first_payment', 2323);

        client.myClick('#topsubmenu #button_save');
        client.myFormCheck('#fileForm', bill);
        client.myFormCheck('#fileForm', billTotal);
        client.assert.elementPresent('#Bill_other_Other_plaster');
        client.page.cryptomedic().tableIterator('#paymentsList')
            .row(1).col(1).assert(bill['#Bill_Date'])
            .nextCol().assert(bill['#Bill_ExaminerName'])
            .nextCol().assert(2323)
            .endTable();

        nb++;
    },

    // 'add a picture': function (client) {
    // 	var picture = {
    // 		'#Picture_Date': '2003-01-02'
    // 	};

    // 	const filePath = require('path').resolve(__dirname + '/../../../resources/upload.jpg');
    // 	const fileContent = require('fs').readFileSync(filePath);
    // 	const btoa = function (binary) { return new Buffer(binary, 'binary').toString('base64'); };
    // 	const imgValue = 'data:image/gif;base64,' + btoa(fileContent);
    // 	// const img = 'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO
    // 	// element()._generatePreview(XInputPicture.dataURItoBlob(img, 'test.jpg'));

    // 	client.myClick('#button_add');
    // 	client.myClick('#add_picture');
    // 	// I think this does not works...
    // 	client.mySetXInputPicture('[name=fileContent]', imgValue);
    // 	client.myForm('#fileForm', picture, '#topsubmenu #button_save');
    // 	// .assert.visible('#img_file');
    // 	nb++;
    // },

    // var appointment = {
    // 	'#Appointment_Nextappointment': '2010-01-01',
    // 	'[name=NextCenter]': 'Ramu'
    // };

    // 'check the created appointment': function(client) {
    //   client
    //     .waitForElementVisible('')
    //     .assert.containsText('', appointment['#Appointment_Nextappointment'])
    //     ;
    // },

    'Delete a file but not confirm it': function (client) {
        client.myClick('#folder_files .folder_file:nth-child(1) .btn');
        client.myClick('#topsubmenu #button_edit');
        client.myClick('#topsubmenu #button_delete');
        client.dismissAlert();
    },

    'Delete all sub-files': function (client) {
        for (var i = 0; i < nb; i++) {
            client.myClick('#folder_files .folder_file:nth-child(1) .btn');
            client.myClick('#topsubmenu #button_edit');
            client.myClick('#topsubmenu #button_delete');
            client.acceptAlert();
        }
    },

    'edit and cancel patient': function (client) {
        client.pause(500);
        client.myClick('#button_patient');
        client.myClick('#topsubmenu #patient_edit');
        client.waitForElementPresent('input#Patient_Name');
        client.assert.value('#Patient_Name', 'mozahar ahamed');
        client.mySetAttribute('[name=Pathology]', 'value', 'ClubFoot');
        client.setValue('#Patient_Name', 'rezaul');
        client.myClick('#topsubmenu #patient_cancel');
        client.waitForElementPresent('#Patient_Name');
        client.assert.containsText('#Patient_Name', 'mozahar ahamed');

        client.end();
    }
};
