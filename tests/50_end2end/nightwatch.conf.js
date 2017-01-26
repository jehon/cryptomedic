/* eslint-env node */
/* eslint no-console: off */

'use strict';

let remoteTarget = require(__dirname + '/../../bin/lib/vagrantPort');
let selenium = require('selenium-server');

selenium.path = __dirname + "/../../backups/selenium-server-standalone-3.0.0-beta4.jar"

module.exports = {
  "src_folders" : [ "tests" ],
  "output_folder" : "../../tmp/end2end",
  "page_objects_path" : "pages",
  "custom_commands_path": [ "commands" ],
  "custom_assertions_path": [ "assertions" ],

  "selenium" : {
    "start_process" : true,
    "start_session" : true,
    "server_path": selenium.path,
    // "log_path" : false,
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver": "../../node_modules/chromedriver/lib/chromedriver/chromedriver",
      "webdriver.gecko.driver": require('geckodriver').path
      // "webdriver.gecko.driver": "../../node_modules/chromedriver/lib/"
    }
  },
  "test_settings" : {
    "default" : {
      "launch_url" : remoteTarget + "/static/index.html",
      "selenium_port"  : 4444,
      "selenium_host"  : "127.0.0.1",
      "silent": true,
      "globals": {
        "waitForConditionTimeout": 10000,
        "waitForConditionPoolInterval": 10000
      },
      "screenshots" : {
        "enabled" : true,
        "on_failure" : true,
        "on_error" : true,
        "path" : "../../tmp/end2end/firefox/"
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "marionnette": true,
        "webdriver.log.driver": "DEBUG",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "phantomjs" : {
      "silent": true,
      "screenshots" : {
        "enabled" : true,
        "path" : "../../tmp/end2end/phantomjs/"
      },
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.binary.path" : "../../node_modules/phantomjs/bin/phantomjs",
        "path": "/var/www/cryptomedic/"
      }
    },
    "chrome" : {
      "silent": true,
      "screenshots" : {
        "enabled" : true,
        "path" : "../../tmp/end2end/chrome/"
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "args": "no-sandbox",
        "path": "/var/www/cryptomedic/"
      }
    }
  }
};
