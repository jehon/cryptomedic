/* eslint-env node */
/* eslint no-console: off */

let webpack_config = require('../../webpack.js');
webpack_config.entry = {};
webpack_config.plugins= [];

module.exports = function(config) {
  var configuration = {
    basePath : '../../',

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-html-reporter'
    ],

    reporters : [
      'progress',
      'coverage',
      'html'
    ],

    webpack: webpack_config,

    files : [
      'www/bower_components/webcomponentsjs/webcomponents-lite.js',
      'www/bower_components/dexie/dist/dexie.min.js',
      'www/static/**/*.js',
      'tests/20_js/**/*.js',
    ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

    browsers: [ 'Firefox' ], // See later

    preprocessors: {
      // http://www.syntaxsuccess.com/viewarticle/writing-jasmine-unit-tests-in-es6
      'www/static/**/*.js': [ 'coverage' ],
      // 'tests/**/test_*.js': [ 'webpack' ]
    },

    junitReporter : {
      outputFile : __dirname + '/../../tmp/js/unit.xml',
      suite : 'unit'
    },

    coverageReporter: {
      type : 'html',
      dir : __dirname + '/../../tmp/js/coverage/'
    },

    htmlReporter: {
      outputDir: __dirname + '/../../tmp/js/html/',
    //   // templatePath: '../tmp/jasmine_template.html'
    }
  };

  var which = require('which');
  which('chrome', function(err, result) {
    if (result) {
      configuration.browsers.push('Chrome');
    }
  });

  config.set(configuration);
};
