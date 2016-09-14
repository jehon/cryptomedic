'use strict';

module.exports = (function() {
  // Static variables:
  var authenticated = false;

  // Public module:
  return function(client) {

    this.authenticate_fillIn = function(login) {
      if (!login) {
        throw new Error('Cryptomedic: Authenticate expect parameter 1 to be the login');
      }

      var password = 'this will not be read by the server in tests';
      return client.init()
        .waitForElementVisible('body')
        .assert.title('Cryptomedic')
        .waitForElementVisible('#login_password')
        .setValue('#login_username', login)
        .setValue('#login_password', password)
        .pause(100)
        .myClick('button#login_go')
        .pause(100);
    };

    // Each action is written as a separate method which must return the browser
    // object in order to be able to be queued
    this.authenticate = function(login) {
      this
        .authenticate_fillIn(login);

      client
        .waitForElementPresent('#login_loggedusername')
        .assert.containsText('#login_loggedusername', login)
        .assert.title('Cryptomedic')
        .pause(1000)
        ;
      authenticated = true;
      return client;
    };

    this.sync = function() {
      if (!authenticated) {
        throw new Error('Cryptomedic: You should be authenticated to use report function');
      }
      client
        .waitForElementVisible('img#sync-ok');
      return client;
    };

    this.report = function(reportName, params) {
      if (!authenticated) {
        throw new Error('Cryptomedic: You should be authenticated to use report function');
      }
      client
        .myClick('#menu_reports')
        .waitForElementVisible('#launch_report_' + reportName)
        .myClick('#launch_report_' + reportName)
        ;
      for(var k in params) {
        var el = 'input[name=' + k + ']';
        client
          .waitForElementVisible(el, '@@ Waiting for parameter ' + k + ' => ' + params[k])
          .clearValue(el);
        if (params[k]) {
          client.setValue(el, params[k]);
        }
      }
      client
        .pause(100)
        .waitForElementVisible('#report_refresh_button')
        .myClick('#report_refresh_button')
        // .waitForElementVisible('.loading')
        .waitForElementVisible('#report_table')
        .waitForElementVisible('#report_table table');

      return client;
    };

    this.goPatient = function(entryyear, entryorder) {
      if (!authenticated) {
        throw new Error('Cryptomedic: You should be authenticated to use report function');
      }
      this.sync();
      client
        .myClick('#menu_home')
        .waitForElementVisible('input[ng-model=\'entryyear\']')
        .clearValue('input[ng-model=\'entryyear\']')
        .setValue('input[ng-model=\'entryyear\']', entryyear)
        .clearValue('input[ng-model=\'entryorder\']')
        .setValue('input[ng-model=\'entryorder\']', entryorder)
        .waitForElementVisible('[ng-click=\'checkReference()\']')
        .myClick('[ng-click=\'checkReference()\']')
        .waitForElementVisible('#Patient_entryyear')
        .assert.containsText('#Patient_entryyear', entryyear)
        .waitForElementVisible('#Patient_entryorder')
        .assert.containsText('#Patient_entryorder', entryorder)
        ;

      return client;
    };

    this.selectFile = function(type, id) {
      client
        .myClick('#folder_menu_' + type + '_' + id)
        .waitForElementVisible('#folder_menu_' + type + '_' + id);
      return client;
    };

    this.tableIterator = function(tableSelector, row, col) {
      // var self = this;
      if (!row) { row = 1; }
      if (!col) { col = 1; }
      return {
        col: function(i) { col = (i ? i : 1); return this; },
        row: function(i) { row = (i ? i : 1); return this; },
        nextCol: function(i) { col = col + (i ? i : 1); return this; },
        nextRow: function(i) { row = row + (i ? i : 1); return this; },
        toString: function() {
          return tableSelector
            + ' tr:' + (row === 'last' ? 'last-child' : 'nth-child(' + row + ')')
            + ' td:' + (col === 'last' ? 'last-child' : 'nth-child(' + col + ')');
        },
        assert: function(text) {
          client
            .waitForElementVisible(tableSelector)
            .waitForElementVisible(this.toString());
          if (text) {
            client
              .assert.containsText(this.toString(), text);
          }
          return this;
        },
        endTable: function() {
          return client;
        }
      };
    }
  };
})();
