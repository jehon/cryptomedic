'use strict';

let payment = {
	'#Payment_Date': '2003-01-02',
	'#Payment_Amount': '123',
	'[name=ExaminerName]': {
		value: 'Shetou'
	},
	'#Payment_Notes': 'Created during the test'
};

module.exports = {
	'find the bill': function(client) {
		client.page.cryptomedic().authenticate('thierry');

		// Select file (id=3)
		client.myClick('#menu_home');
		client.waitForElementVisible('input[ng-model=\'entryyear\']');
		client.clearValue('input[ng-model=\'entryyear\']');
		client.setValue('input[ng-model=\'entryyear\']', 2014);
		client.clearValue('input[ng-model=\'entryorder\']');
		client.setValue('input[ng-model=\'entryorder\']', 103);
		client.myClick('[ng-click=\'checkReference()\']');

		client.waitForElementPresent('#Patient_Name');
		client.assert.containsText('#Patient_Name', 'OSMAN');

		client.page.cryptomedic().selectFile('Bill', 2);
		client.page.cryptomedic().tableIterator('#paymentsList')
			.section('tfoot')
			.row(1).col(2).assert('Total')
			.row(1).col(3).assert('138')
			.endTable();
	},

	'try to set date in the future': function(client) {
		client.myClick('#topsubmenu #button_unlock');
		client.waitForElementVisible('#Bill_Date');
		client.myFormFillIn('#fileForm', {
			'#Bill_Date': '2999-01-01'
		}, '#topsubmenu #button_save');
		client.acceptAlert();
		client.pause(100);
		client.assert.visible('#errorDateFuture');
		client.assert.visible('#topsubmenu #button_save');
		client.assert.visible('#topsubmenu #button_cancel');
		client.myClick('#topsubmenu #button_cancel');
	},

	'add a payment': function(client) {
		client.myFormFillIn('#paymentForm', payment, '#button_payment_create');
		client.page.cryptomedic().tableIterator('#paymentsList')
			.row(4).col(1).assert(payment['#Payment_Date'])
			.nextCol().assert('Shetou')
			.nextCol().assert(123)
			.section('tfoot')
			.row(1).col(2).assert('Total')
			.row(1).col(3).assert('261')
			.endTable();
	},

	'modify a payment': function(client) {
		client.click('#button_edit_3');

		// Check form

		client.clearValue('#Payment_Amount');
		client.setValue('#Payment_Amount', 456);
		client.click('#button_payment_save');
		client.page.cryptomedic().myWaitFetch();
		client.pause(1000);
		client.page.cryptomedic().tableIterator('#paymentsList')
			.row(4).col(1).assert(payment['#Payment_Date'])
			.nextCol().assert('Shetou')
			.nextCol().assert('456')
			.section('tfoot')
			.row(1).col(2).assert('Total')
			.row(1).col(3).assert('594')
			.endTable();
	},

	'delete a payment': function(client) {
		client.click('#button_delete_3');
		client.page.cryptomedic().myWaitFetch();
		client.pause(1000);
		client.page.cryptomedic().tableIterator('#paymentsList')
			.section('tfoot')
			.row(1).col(2).assert('Total')
			.row(1).col(3).assert('138')
			.endTable();
		client.end();
	}
};
