module.exports = {
	'wrong_password': function(client) {
		client.page.cryptomedic().authenticate_fillIn('user_that_does_not_exists_at_all');

		client.myComponentExecute('x-login-status >>> x-form', function() {
			return this.hasMessages();
		}, [], function(result) {
			client.assert.equal(result, true);
		});
	},

	'authenticate_multiple': function(client) {
	    client.page.cryptomedic().authenticate('readonly');
		client.myComponentExecute('x-login-status >>> #logout', function() { JHElement.fireOn(this, 'click'); });
	    client.page.cryptomedic().authenticate('readonly');
		client.end();
	},
};
