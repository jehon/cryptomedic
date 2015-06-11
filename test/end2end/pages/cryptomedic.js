module.exports = function(client) {
    // Each action is written as a separate method which must return the browser
    // object in order to be able to be queued
    var authenticated = false;
    var timeout = 10 * 1000;
    var livePasswords = {};
    
    this.authenticate = function(login) {
	if (!login) {
	    throw new Error("Authenticate expect parameter 1 to be the login");
	}

	var password = "test";
	if (client.globals && client.globals.live) {
	    data = require("./../../../../secrets.json");
	    if (client.globals && client.globals.live && data.cryptomedic && data.cryptomedic.passwords && data.cryptomedic.passwords[login]) {
		console.log("using secret password for user " + login);
		password = data.cryptomedic.passwords[login];
	    } else {
		throw new Error("Authenticate did not found secret passord for " + login);
	    }
	}

	client.url(client.launch_url + '/cryptomedic/app/')
		.watchLog(true)
		.waitForElementVisible('body', timeout)
		.assert.title('Cryptomedic')
		.saveScreenshot(client.screenshotsPath + "/1-1-loginpage.png")
		.setValue("#login_username", login)
		.setValue("#login_password", password)
		.pause(100)
		.saveScreenshot(client.screenshotsPath + "/1-2-before-myclick.png")
		.myClick("button#login_go")
		.saveScreenshot(client.screenshotsPath + "/1-3-loggin-in.png")
		.waitForElementPresent("#login_loggedusername", timeout)
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

		.waitForElementVisible("#launch_report_" + reportName, timeout)
		.click("#launch_report_" + reportName)
		;
      for(var k in params) {
	  var el = "input[name=" + k + "]";
      	  client
      			.waitForElementVisible(el, timeout, "@@ Waiting for parameter " + k + " => " + params[k])
      		    	.clearValue(el);
      	  if (params[k]) {
      	      client.setValue(el, params[k]);
      	  }
      }
      client
      		.waitForElementVisible("#report_refresh_button", timeout)
		.click("#report_refresh_button")
		.waitForElementVisible("#report_table", timeout)
		.waitForElementVisible("#report_table table", timeout);
      
      return client;
    }    
};
