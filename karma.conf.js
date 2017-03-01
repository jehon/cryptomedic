/* eslint-env node */
/* eslint no-console: off */

module.exports = function(config) {
  var configuration = {
    basePath : 'www/',

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
    ],

    reporters : [
      'progress',
      'coverage',
      'html'
    ],

    files : [
      'bower_components/webcomponentsjs/webcomponents-lite.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/jquery/dist/jquery.min.js',
      {
        pattern: "bower_components/**",
        included: false,
        served: true,
        watched: false
      },
      'bower_components/dexie/dist/dexie.min.js',
      'bower_components/karma-read-json/karma-read-json.js',
      'static/**/*.js',
      'static/elements/codage.html',
      // { pattern: '**/*.html', included: false, served: true },
      '../tests/unitjs/mocks/*.js',
      '../tests/unitjs/*.js',
      { pattern: 'api/v1.1/tests/references/*.json', included: false },
      { pattern: '**/worker.js', included: false },
    ],

    autoWatch : true,

    browsers: [ 'Firefox' ],

    preprocessors: {
      'static/**/*.js': [ 'coverage' ],
      // '*.js': [ 'coverage' ],
      // '*.html': [ 'coverage' ],
      // '!(bower_components)/**/*.js': [ 'coverage' ],
      // '!(bower_components)/**/*.html': [ 'coverage' ],
    },

    coverageReporter: {
      type :  'lcov',
      dir :   'target/',
      subdir: 'unit/'
    },

    htmlReporter: {
      outputDir: __dirname + '/target/js/html/',
    //   // templatePath: '../tmp/jasmine_template.html'
    }
  };

  config.set(configuration);
};
