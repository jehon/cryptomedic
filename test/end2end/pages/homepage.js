module.exports = function(client) {
    // Each action is written as a separate method which must return the browser
    // object in order to be able to be queued
    this.authenticate = function() {
	client.url(client.launch_url + '/cryptomedic/app/')
		.waitForElementVisible('body', 1000);
	return client;
    };
};
