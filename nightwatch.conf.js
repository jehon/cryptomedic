/* eslint-env node */
/* eslint no-console: off */

'use strict';

let selenium = require('selenium-server');
let remoteTarget = "http://localhost/static/index.html"

// PHP Server
remoteTarget = "http://localhost:5556/static/index.html"

module.exports = {
  "src_folders" : [ "tests/e2e/tests" ],
  "output_folder" : "target/e2e/",
  "page_objects_path" : "tests/e2e/pages",
  "custom_commands_path": [ "tests/e2e/commands" ],
  "custom_assertions_path": [ "tests/e2e/assertions" ],

  "selenium" : {
    "start_process" : true,
    "start_session" : true,
    "server_path": selenium.path,
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver": "node_modules/chromedriver/lib/chromedriver/chromedriver",
      "webdriver.gecko.driver": require('geckodriver').path
      // "webdriver.gecko.driver": "node_modules/chromedriver/lib/"
    }
  },
  "test_settings" : {
    "default" : {
      "launch_url" : remoteTarget,
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
        "path" : "target/e2e/firefox/"
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "marionnette": true,
        "webdriver.log.driver": "DEBUG",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome" : {
      "silent": true,
      "screenshots" : {
        "enabled" : true,
        "path" : "target/e2e/chrome/"
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "args": "no-sandbox",
      }
    }
  }
};
