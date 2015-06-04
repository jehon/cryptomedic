module.exports = function(client) {
    // Each action is written as a separate method which must return the browser
    // object in order to be able to be queued
    var authenticated = false;
    
    this.authenticate = function(login, password) {
	password = password || "test";
	client.url(client.launch_url + '/cryptomedic/app/')
		.watchLog(true)
		.waitForElementVisible('body', 1000)
		.assert.title('Cryptomedic')
		.saveScreenshot(client.screenshotsPath + "/1-1-loginpage.png")
		.setValue("#login_username", login)
		.setValue("#login_password", password)
		.pause(100)
		.saveScreenshot(client.screenshotsPath + "/1-2-before-myclick.png")
		.myClick("button#login_go")
		.saveScreenshot(client.screenshotsPath + "/1-3-loggin-in.png")
		.waitForElementPresent("#login_loggedusername", 5000)
		.saveScreenshot(client.screenshotsPath + "/1-5-logged-in.png")
		.assert.containsText("#login_loggedusername", login)
		.assert.title('Cryptomedic')
		.saveScreenshot(client.screenshotsPath + "/1-6-ok.png")
	authenticated = true;
	return client;
    };   
    
    this.report = function(reportName, params) {
      client
      		.page.cryptomedic().authenticate("readonly")
      		.click("#menu_reports")

		.waitForElementVisible("#launch_report_" + reportName, 1000)
		.click("#launch_report_" + reportName)
		;
      for(var k in params) {
	  var el = "input[name=" + k + "]";
	  client.waitForElementVisible(el, 1000)
	  	.clearValue(el);
	  if (params[k]) {
	      client.setValue(el, params[k]);
	  }
      }
      client
      		.waitForElementVisible("#report_refresh_button", 1000)
		.click("#report_refresh_button")
		
		.waitForElementVisible("#report_table", 5000)
		.waitForElementVisible("#report_table table", 1000)
	return client;
    }    
};
