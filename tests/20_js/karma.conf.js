module.exports = function(config) {
  var configuration = {
    plugins : [
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                // 'karma-html-reporter'
    ],
    reporters : [
                  'progress',
                  'coverage',
                  // 'html'
                ],

    basePath : '../../',

    files : [
              'tests/20_js/kickoff.js',
              'app/bower_components/jquery/dist/jquery.min.js',
              'app/bower_components/angular/angular.js',
              'app/bower_components/angular-route/angular-route.js',
              'app/bower_components/angular-mocks/angular-mocks.js',
              'app/bower_components/dexie/dist/latest/Dexie.min.js',
              'app/static/js/application.js',
              'app/static/js/database.js',
              'app/static/js/myfetch.js',
              'app/static/js/cryptomedic.js',
              'app/static/js/exceptions*.js',
              'app/static/js/model*.js',
              'tests/20_js/**/*.js',
              { pattern : 'tests/20_js/mocks/*.json', watched : true, served : true, included : false }
            ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

//    browsers: [ 'Chrome', "Firefox" ],
    browsers: [ "Firefox" ],

    customLaunchers: {
      // http://stackoverflow.com/questions/19255976/how-to-make-travis-execute-angular-tests-on-chrome-please-set-env-variable-chr
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    junitReporter : {
      outputFile : 'tmp/js/unit.xml',
      suite : 'unit'
    },

    preprocessors: {
      'app/js/*.js': [ 'coverage' ]
    },

    coverageReporter: {
      type : 'html',
      dir : 'tmp/js/'
    }

    // htmlReporter: {
    //   outputDir: 'tmp',
    //   templatePath: '../tmp/jasmine_template.html'
    // }
  };

  if(process.env.TRAVIS){
    // configuration.browsers = [ 'Firefox', 'Chrome_travis_ci' ];
    configuration.browsers = [ 'Firefox' ];
  } else {
    configuration.browsers = [ 'Firefox', 'Chrome' ];
  }

  config.set(configuration);
};
