/* eslint-env node */
/* eslint no-console: off */

const path = require('path');
const fse = require('fs-extra');
const root = path.dirname(path.dirname(__dirname));
fse.emptyDirSync(path.join(root, '/target/js'));
fse.emptyDirSync(path.join(root, '/target/unit'));

// https://blog.cepharum.de/en/post/natively-unit-testing-es6-modules-in-browser-including-coverage.html

module.exports = function (config) {
	const configuration = {
		basePath: path.join(root, 'www/'),

		frameworks: [
			'jasmine-es6',
			'jasmine',
			'jasmine-html'
		],

		reporters: [
			'progress',
			'coverage-istanbul',
			'html'
		],

		files: [
			'../node_modules/karma-read-json/karma-read-json.js',
			'../node_modules/bootstrap/dist/css/bootstrap.min.css',
			'build/vendor*.js',
			'build/app-*.js',
			{ pattern: 'build/**', included: false },
			{ pattern: 'api/*/tests/references/*.json', included: false },
			'../tests/unitjs/*.js',
			{ pattern: 'static/**', included: false },
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
			'static/**/*.js': ['karma-coverage-istanbul-instrumenter'],
		},

		coverageIstanbulInstrumenter: {
			esModules: true
		},

		coverageReporter: {
			type: 'lcov',
			dir: __dirname + '/target/',
			subdir: 'unit/'
		},

		coverageIstanbulReporter: {
			reports: ['html', 'text'],
			dir: path.join(root, 'target/js/htmlInstanbul'),
		},

		htmlReporter: {
			outputDir: path.join(root, '/target/js/html/'),
			//   // templatePath: '../tmp/jasmine_template.html'
		},

		proxies: {
			'/static/': '/base/static/',
			'/elements/': '/base/static/elements/',
			'/build/bootstrap/': '/base/build/bootstrap/',
			'/resources/': '/base/build/resources/'
		},
	};

	config.set(configuration);
};
