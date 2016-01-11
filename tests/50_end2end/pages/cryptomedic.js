module.exports = (function() {
  // Static variables:
  var authenticated = false;

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
          console.info("using secret password for user " + login);
          password = liveData.cryptomedic.passwords[login];
        } else {
          throw new Error("Authenticate did not found secret passord for " + login);
        }
      } catch (ex) {}

      client.init()
        .waitForElementVisible("body")
        .assert.title("Cryptomedic")
        .waitForElementVisible("#login_password")
        .setValue("#login_username", login)
        .setValue("#login_password", password)
        .pause(100)
        .myClick("button#login_go")
        .waitForElementPresent("#login_loggedusername")
        .assert.containsText("#login_loggedusername", login)
        .assert.title("Cryptomedic")
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
        .waitForElementVisible("img#sync-ok");
      return client;
    };

    this.report = function(reportName, params) {
      if (!authenticated) {
        throw new Error("Cryptomedic: You should be authenticated to use report function");
      }
      client
        .myClick("#menu_reports")
        .waitForElementVisible("#launch_report_" + reportName)
        .myClick("#launch_report_" + reportName)
        ;
      for(var k in params) {
        var el = "input[name=" + k + "]";
        client
          .waitForElementVisible(el, "@@ Waiting for parameter " + k + " => " + params[k])
          .clearValue(el);
        if (params[k]) {
          client.setValue(el, params[k]);
        }
      }
      client
        .waitForElementVisible("#report_refresh_button")
        .myClick("#report_refresh_button")
        .waitForElementVisible("#report_table")
        .waitForElementVisible("#report_table table");

      return client;
    };

    this.goPatient = function(entryyear, entryorder) {
      if (!authenticated) {
        throw new Error("Cryptomedic: You should be authenticated to use report function");
      }
      this.sync();
      client
        .myClick("#menu_home")
        .waitForElementVisible("input[ng-model=\"entryyear\"]")
        .clearValue("input[ng-model=\"entryyear\"]")
        .setValue("input[ng-model=\"entryyear\"]", entryyear)
        .clearValue("input[ng-model=\"entryorder\"]")
        .setValue("input[ng-model=\"entryorder\"]", entryorder)
        .waitForElementVisible("[ng-click=\"checkReference()\"]")
        .myClick("[ng-click=\"checkReference()\"]")
        .waitForElementVisible("#Patient_entryyear")
        .assert.containsText("#Patient_entryyear", entryyear)
        .waitForElementVisible("#Patient_entryorder")
        .assert.containsText("#Patient_entryorder", entryorder)
        ;

      return client;
    };

    this.selectFile = function(type, id) {
      client
        .myClick("#folder_menu_" + type + "_" + id)
        .waitForElementVisible("#folder_menu_" + type + "_" + id);
      return client;
    };
  };
})();
