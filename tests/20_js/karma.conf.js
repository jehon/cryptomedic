module.exports = function(config) {
  var configuration = {
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

    basePath : '../../',

    files : [
      // Work only if one bundle is present:
      'www/build/bundle-*.js',
      'www/static/js/application.js',
      'www/static/js/calculations.js',
      'tests/20_js/**/test_*.js',
      { pattern : 'tests/20_js/mocks/*.json', watched : true, served : true, included : false }
    ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

    browsers: [ 'Firefox' ], // See later

    preprocessors: {
      // 'app/js/*.js': [ 'coverage' ],
      // http://www.syntaxsuccess.com/viewarticle/writing-jasmine-unit-tests-in-es6
      'tests/**/test_*.js': [ 'webpack' ]
    },


    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel', query: { cacheDirectory: true }}
        ]
      },
      watch: true,

      resolve: {
        extensions: [ '', '.js', '.jsx'],
        modulesDirectories: [ __dirname + '/../../node_modules/', __dirname + '/../../app/', './' ],
        alias: {
          'jquery': 'jquery'
        }
      }

    },

    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
      noInfo: true
    },

    junitReporter : {
      outputFile : __dirname + '/../../tmp/js/unit.xml',
      suite : 'unit'
    },

    coverageReporter: {
      type : 'html',
      dir : __dirname + '/../../tmp/js/coverage/'
    },

    // htmlReporter: {
    //   outputDir: '../../tmp/js/html/',
    //   // templatePath: '../tmp/jasmine_template.html'
    // }
  };

  var which = require('which');
  which('chrome', function(err, result) {
    if (result) {
      configuration.browsers.push('Chrome');
    }
  });


  config.set(configuration);
};
