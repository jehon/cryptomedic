module.exports = {
	'Homepage' : function (client) {
	    client
	    	.url(client.launch_url + '/cryptomedic/')
		.waitForElementVisible('body', 1000)
//      .setValue('input[type=text]', 'nightwatch')
//      .waitForElementVisible('button[name=btnG]', 1000)
//      .click('button[name=btnG]')
//      .pause(1000)
//      .assert.containsText('#main', 'Night Watch')
		.end();
  }
};
