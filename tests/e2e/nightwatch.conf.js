/* eslint-env node */

'use strict';

let remoteTarget = 'http://localhost:5555/build/index.html';

module.exports = {
    'src_folders': ['tests/e2e/tests'],
    'page_objects_path': 'tests/e2e/pages',
    'custom_commands_path': ['tests/e2e/commands'],
    'custom_assertions_path': ['tests/e2e/assertions'],
    'output_folder': 'target/e2e/',

    'globals_path': 'nightwatch-global.js',

    'webdriver': {
        'start_process': true,

        // For chrome, because firefox does not works:
        'server_path': 'node_modules/.bin/chromedriver',
        'port': 9515,
        'use_legacy_jsonwire': true,
    },

    'test_settings': {
        'default': {
            'launch_url': remoteTarget,
            'globals': {
                'waitForConditionTimeout': 10000,
                'waitForConditionPoolInterval': 10000
            },
            'desiredCapabilities': {
                // 'browserName' : 'firefox',
                'browserName': 'chrome',
                // 'acceptInsecureCerts' : true,
                // 'loggingPrefs': {'driver': 'INFO', 'server': 'OFF', 'browser': 'INFO'}
                'goog:chromeOptions': {
                    args: [
                        '--headless',
                        // https://stackoverflow.com/a/41546370/1954789
                        // 'window-size=1280,800'
                        'window-size=1280,1600'
                    ]
                },
            },
            'screenshots': {
                'enabled': true,
                'on_failure': true,
                'on_error': true,
                'path': 'target/e2e/browsers/firefox/'
            },
        }
    }
};

if (process.env['E2E_FULL']) {
    module.exports.test_settings.default.desiredCapabilities['goog:chromeOptions'].args = [];
}
