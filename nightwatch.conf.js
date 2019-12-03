/* eslint-env node */
/* eslint no-console: off */

'use strict';

// let selenium = require('selenium-server');
// let remoteTarget = "http://localhost/static/index.html"

// PHP Server: @latitude = not debug mode
let remoteTarget = 'http://localhost:5555/static/index.html';

module.exports = {
	'src_folders' : [ 'tests/e2e/tests' ],
	'page_objects_path' : 'tests/e2e/pages',
	'custom_commands_path': [ 'tests/e2e/commands' ],
	'custom_assertions_path': [ 'tests/e2e/assertions' ],
	'output_folder' : 'target/e2e/',

	'globals_path': 'nightwatch-global.js',

	'webdriver': {
		'start_process': true,

		// For chrome, because firefox does not works:
		'server_path': 'node_modules/.bin/chromedriver',
		'port' : 9515,
		'use_legacy_jsonwire': true,
	},

	'test_settings' : {
		'default' : {
			'launch_url' : remoteTarget,
			'globals': {
				'waitForConditionTimeout': 10000,
				'waitForConditionPoolInterval': 10000
			},
			// 'webdriver': {
			// 	'server_path': 'node_modules/.bin/geckodriver',
			// 	'port' : 4444,
			// // 'cli_args': [
			// // '--headless'
			// // ]
			// },
			'desiredCapabilities' : {
				// 'browserName' : 'firefox',
				'browserName': 'chrome',
				// 'acceptInsecureCerts' : true,
				// 'loggingPrefs': {'driver': 'INFO', 'server': 'OFF', 'browser': 'INFO'}
				'goog:chromeOptions': {
					// w3c: false,
					args: [
						'--headless',
						'window-size=1280,800'
					]
				},			},
			'screenshots' : {
				'enabled' : true,
				'on_failure' : true,
				'on_error' : true,
				'path' : 'target/e2e/browsers/firefox/'
			},
		},
		// 'chrome' : {
		// 	'webdriver': {
		// 		'port': 9515,
		// 		'server_path': 'node_modules/.bin/chromedriver',
		// 		'cli_args': [
		// 			// 	'--headless',
		// 			// 	'--auto-open-devtools-for-tabs'
		// 		]
		// 	},

		// 	'desiredCapabilities' : {
		// 		'browserName' : 'chrome'
		// 	},
		// 	'screenshots' : {
		// 		'enabled' : true,
		// 		'path' : 'target/e2e/browsers/chrome/'
		// 	},
		// },
	}
};
