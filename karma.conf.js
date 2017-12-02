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
      // Custom Elements v0
      'bower_components/webcomponentsjs/webcomponents-lite.js',

      // Custom Elements v1
      'bower_components/custom-elements/custom-elements.min.js',

      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/karma-read-json/karma-read-json.js',
      'bower_components/he/he.js',
      'bundle.js',
      { pattern: 'api/*/tests/references/*.json',    included: false },
      { pattern: "bower_components/**",              included: false, served: true, watched: false },
      { pattern: "static/elements/resources/*",      included: false, served: true, watched: true },
      'static/elements/jh-element.js',
      'static/!(elements)/**/*.js',
      'static/elements/*.js',
      'static/elements/*.html',
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
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
    }
  };

  config.set(configuration);
};
