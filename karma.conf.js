/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
	var configuration = {
		basePath : 'www/',

		frameworks : [
			'jasmine-es6',
			'jasmine',
			'jasmine-html'
		],

		reporters : [
			'progress',
			'coverage',
			'html'
		],

		files : [
			'../node_modules/karma-read-json/karma-read-json.js',
			'../node_modules/bootstrap/dist/css/bootstrap.min.css',
			'build/app-*.js',
			{ pattern: 'build/**',                         included: false, served: true, watched: true },
			{ pattern: 'api/*/tests/references/*.json',    included: false },
			{ pattern: 'static/elements/resources/*',      included: false, served: true, watched: true },
			'static/objects/*.js',
			'static/elements/jh-element.js',
			'static/elements/x-overlay.js',
			'static/elements/x-waiting.js',
			'static/elements/x-waiting-folder.js',
			'static/elements/x-requestor.js',
			'static/elements/x-requestor-crud.js',
			'static/elements/x-file.js',
			'static/elements/x-file-bill.js',
			'static/!(elements)/**/*.js',
			'static/elements/*.js',
			'../tests/unitjs/*.js',
			{ pattern: 'static/**',                        included: false, served: true, watched: false },
		],

		autoWatch : true,

		browsers: [
			// 'FirefoxHeadless',
			'ChromeHeadless'
		],

		// https://github.com/karma-runner/karma-firefox-launcher/issues/76
		customLaunchers: {
			FirefoxHeadless: {
				base: 'Firefox',
				flags: [ '-headless' ],
			},
		},

		preprocessors: {
			'static/**/*.js': [ 'coverage' ],
		},

		coverageReporter: {
			type :  'lcov',
			dir :   __dirname + '/target/',
			subdir: 'unit/'
		},

		htmlReporter: {
			outputDir: __dirname + '/target/js/html/',
			//   // templatePath: '../tmp/jasmine_template.html'
		},

		proxies: {
			'/static/': '/base/static/',
			'/elements/': '/base/static/elements/',
			'/build/bootstrap/': '/base/build/bootstrap/'
		},
	};

	config.set(configuration);
};
