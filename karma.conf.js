/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
  var configuration = {
    basePath : 'www/',

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-html-reporter'
    ],

    frameworks : [
      'jasmine',
    ],

    reporters : [
      'progress',
      'coverage',
      'html'
    ],

    files : [
      '../node_modules/karma-read-json/karma-read-json.js',
      'build/app.js',
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
      'static/!(elements)/**/*.js',
      'static/elements/*.js',
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
      { pattern: "static/**",                        included: false, served: true, watched: false },
    ],

    autoWatch : true,

    browsers: [ 'FirefoxHeadless', 'ChromeHeadless' ],

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
      "/static/": "/base/static/",
      "/elements/": "/base/static/elements/",
      "/build/bootstrap/": "/base/build/bootstrap/"
    },
  };

  config.set(configuration);
};
