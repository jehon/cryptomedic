/* eslint-env node */
/* eslint no-console: off */

// let server = require("./tests/resources/server.js");

module.exports = function(config) {
  var configuration = {
    basePath: 'www/',

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
      'jasmine',
      // 'express-http-server'
    ],

    reporters : [
      'progress',
      'coverage',
//      'sonarqubeUnit',
    ],

    files : [
      'bower_components/webcomponentsjs/webcomponents-lite.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/jquery/dist/jquery.min.js',
      {
        pattern: 'bower_components/**/*.js',
        watched: false,
        included: false,
        served: true,

      },
      'bower_components/dexie/dist/dexie.min.js',
      'bower_components/karma-read-json/karma-read-json.js',
      'static/**/*.js',
      'static/elements/codage.html',
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
      { pattern: 'api/v1.1/tests/references/*.json', included: false },
      { pattern: '**/worker.js', included: false },
    ],

    autoWatch : true,

    browsers: [ 'Firefox' ],

    preprocessors: {
      '*.js': [ 'coverage' ],
      '*.html': [ 'coverage' ],
      '!(bower_components)/**/*.js': [ 'coverage' ],
      '!(bower_components)/**/*.html': [ 'coverage' ],
    },

    coverageReporter: {
      type :  'lcov',
      dir :   'target/',
      subdir: 'unit/'
    },

    // junitReporter: {
    // sonarQubeUnitReporter: {
    //   outputFile: 'target/unit/test-results.xml',
    //   useBrowserName: false,
    //   // suite: 'tests/unit'
    // },

    // expressHttpServer: {
    //   port: 3120,
    //   // this function takes express app object and allows you to modify it
    //   // to your liking. For more see http://expressjs.com/4x/api.html
    //   appVisitor: function (app, log) {
    //     return server(app, log);
    //   }
    // },

    // htmlReporter: {
    //   outputDir: __dirname + '/target/html/',
    // }
  };

  config.set(configuration);
};
