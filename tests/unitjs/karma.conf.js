/* eslint-env node */
/* eslint no-console: off */

const path = require('path');
const fse = require('fs-extra');
const root = path.dirname(path.dirname(__dirname));
fse.emptyDirSync(path.join(root, '/tmp/js'));

// https://blog.cepharum.de/en/post/natively-unit-testing-es6-modules-in-browser-including-coverage.html

module.exports = function (config) {
    const configuration = {
        basePath: root,

        frameworks: [
            'jasmine',
            'jasmine-html'
        ],

        reporters: [
            'progress',
            'coverage',
            'html',
            'junit',
            'kjhtml' // allow output in debug.html page
        ],

        files: [
            'node_modules/karma-read-json/karma-read-json.js',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            { pattern: 'tests/unitjs/*-test.js', type: 'module' },
            { pattern: 'tests/unitjs/**', included: false },
            { pattern: 'tests/resources/**', included: false },
            { pattern: 'app/**/*', included: false },
            { pattern: '**/*', included: false, watched: false },
        ],

        autoWatch: true,

        browsers: [
            // 'FirefoxHeadless',
            'ChromeHeadless'
        ],

        // https://github.com/karma-runner/karma-firefox-launcher/issues/76
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },

        preprocessors: {
            'app/*.js': ['coverage'],
            'app/!(cjs2esm)/**/*.js': ['coverage']
        },

        coverageReporter: {
            dir: path.join(root, '/tmp/'),
            includeAllSources: true,
            reporters: [
                {
                    type: 'lcov',
                    subdir: 'js/'
                },
                /* { type: 'text-summary' } */
            ]
        },

        htmlReporter: {
            outputDir: path.join(root, '/tmp/js/html/'),
        },

        junitReporter: {
            outputDir: 'tmp/js/junit',
            useBrowserName: false,
            xmlVersion: 1
        },

        proxies: {
            '/static/': '/base/www/static/',
            '/resources/': '/base/resources/',
        },
    };

    if (process.env.NOCOV) {
        console.info('*** NOCOV: disable coverage ***');
        delete configuration.preprocessors;
    } else {
        console.info('*** Coverage enabled - disable it with NOCOV');
    }

    config.set(configuration);
};
