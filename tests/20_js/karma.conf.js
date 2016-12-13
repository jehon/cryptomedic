/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
  var configuration = {
    basePath : '../../www/',

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-phantomjs-launcher',
      // 'karma-detect-browsers',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-html-reporter'
    ],

    frameworks : [
      'jasmine'
    ],

    reporters : [
      'progress',
      'coverage',
      'html'
    ],

    files : [
      // 'bower_components/platform/platform.js',
      // 'bower_components/polymer/polymer-mini.html',
      // 'bower_components/polymer/polymer-micro.html',
      // 'bower_components/polymer/polymer.html',
      // 'bower_components/webcomponentsjs/webcomponents-lite.js',
      'bower_components/dexie/dist/dexie.min.js',
      'static/**/*.js',
      // 'static/elements/codage.html',
      '../tests/20_js/**/*.js',
    ],

    autoWatch : true,

    browsers: [ 'Firefox' ], // See later

    preprocessors: {
      'static/**/*.js': [ 'coverage' ],
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
