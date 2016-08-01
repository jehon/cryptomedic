/* eslint-env node */
/* eslint no-console: off */

'use strict';

let selenium = require('selenium-server');
console.log("selenium path ", selenium.path);

module.exports = {
  "src_folders" : [ "tests" ],
  "output_folder" : "../../tmp/end2end",
  "page_objects_path" : "pages",
  "custom_commands_path": [ "commands" ],
  "custom_assertions_path": [ "assertions" ],

  "selenium" : {
    "start_process" : true,
    "server_path": selenium.path,
    // "log_path" : false,
    // "host" : "127.0.0.1",
    // "port" : 4444,
    "cli_args" : {
      "debug": "1"
    //   "webdriver.chrome.driver": "../../node_modules/chromedriver/lib/chromedriver/chromedriver"
    }
  },
  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost/build/index.html",
      // "selenium_port"  : 4444,
      // "selenium_host"  : "127.0.0.1",
      // "silent": true,
      // "globals": {
      //   "waitForConditionTimeout": 10000,
      //   "waitForConditionPoolInterval": 10000
      // },
      // "screenshots" : {
      //   "enabled" : true,
      //   "on_failure" : true,
      //   "on_error" : true,
      //   "path" : "../../tmp/end2end/firefox/"
      // },
      "desiredCapabilities": {
        "browserName": "firefox",
        // "javascriptEnabled": true,
        // "acceptSslCerts": true
      }
    // },
    // "phantomjs" : {
    //   "screenshots" : {
    //     "enabled" : true,
    //     "path" : "../../tmp/end2end/phantomjs/"
    //   },
    //   "desiredCapabilities": {
    //     "browserName": "phantomjs",
    //     "javascriptEnabled": true,
    //     "acceptSslCerts": true,
    //     "phantomjs.binary.path" : "../../node_modules/phantomjs/bin/phantomjs",
    //     "path": "/var/www/cryptomedic/"
    //   }
    // },
    // "chrome" : {
    //   "screenshots" : {
    //     "enabled" : true,
    //     "path" : "../../tmp/end2end/chrome/"
    //   },
    //   "desiredCapabilities": {
    //     "browserName": "chrome",
    //     "javascriptEnabled": true,
    //     "acceptSslCerts": true,
    //     "args": "no-sandbox",
    //     "path": "/var/www/cryptomedic/"
    //   }
    }
  }
};
