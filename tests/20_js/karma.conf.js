'use strict';

let webpack_config = require('../../webpack.js');

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

    files : [
      // Work only if one bundle is present:
      // 'www/build/bundle-*.js',
      // 'app/**/*.js',
      'tests/20_js/**/test_*.js',
      // { pattern : 'tests/20_js/mocks/*.json', watched : true, served : true, included : false }
    ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

    browsers: [ 'Firefox' ], // See later

    preprocessors: {
      // 'app/js/*.js': [ 'coverage' ],
      // http://www.syntaxsuccess.com/viewarticle/writing-jasmine-unit-tests-in-es6
      // 'app/**/*.js': [ 'webpack' ],
      'tests/**/test_*.js': [ 'webpack' ]
    },

    webpack: webpack_config,

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
