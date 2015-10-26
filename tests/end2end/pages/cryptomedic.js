module.exports = (function() {
  // Static variables:
  var authenticated = false;
  var timeout = 10 * 1000;

  // Public module:
  return function(client) {

    // Each action is written as a separate method which must return the browser
    // object in order to be able to be queued
    this.authenticate = function(login) {
      if (!login) {
          throw new Error("Cryptomedic: Authenticate expect parameter 1 to be the login");
      }

      var password = "this will not be read by the server in tests";
      try {
        var liveData = require("./../../../secrets.json");
        if (client.globals && client.globals.live && liveData.cryptomedic && liveData.cryptomedic.passwords && liveData.cryptomedic.passwords[login]) {
          console.log("using secret password for user " + login);
          password = liveData.cryptomedic.passwords[login];
        } else {
          throw new Error("Authenticate did not found secret passord for " + login);
        }
      } catch (ex) {}

      client.url(client.launch_url + '/cryptomedic/app/')
        .watchLog(true)
        .waitForElementVisible('body', timeout)
        .assert.title('Cryptomedic')
        .setValue("#login_username", login)
        .setValue("#login_password", password)
        .pause(100)
        .myClick("button#login_go")
        .waitForElementPresent("#login_loggedusername", timeout)
        .assert.containsText("#login_loggedusername", login)
        .assert.title('Cryptomedic')
        .pause(1000)
        ;
      authenticated = true;
      return client;
    };

    this.sync = function() {
      if (!authenticated) {
        throw new Error("Cryptomedic: You should be authenticated to use report function");
      }
      client
        .waitForElementVisible("img#sync-ok", timeout)
      return client;
    };

    this.report = function(reportName, params) {
      if (!authenticated) {
        throw new Error("Cryptomedic: You should be authenticated to use report function");
      }
      client
        .myClick("#menu_reports")
        .waitForElementVisible("#launch_report_" + reportName, timeout)
        .myClick("#launch_report_" + reportName)
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
        .myClick("#report_refresh_button")
        .waitForElementVisible("#report_table", timeout)
        .waitForElementVisible("#report_table table", timeout);

      return client;
    };

    this.goPatient = function(entryyear, entryorder) {
      if (!authenticated) {
          throw new Error("Cryptomedic: You should be authenticated to use report function");
      }
      this.sync();
      client
        .waitForElementVisible('input[ng-model="entryyear"]', timeout)
        .clearValue('input[ng-model="entryyear"]')
        .setValue('input[ng-model="entryyear"]', entryyear)
        .clearValue('input[ng-model="entryorder"]')
        .setValue('input[ng-model="entryorder"]', entryorder)
        .waitForElementVisible('[ng-click="checkReference()"]', timeout)
        .myClick('[ng-click="checkReference()"]')
        ;

      return client;
    }
  };
})();
