module.exports = function(config) {
  var configuration = {
    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-webpack'
      // 'karma-html-reporter'
    ],
    reporters : [
      'progress',
      'coverage'
      // 'html'
    ],

    basePath : '../../',

    files : [
      // Work only if one bundle is present:
      'www/build/bundle-*.js',
      'www/build/static/js/application.js',
      'www/build/static/js/calculations.js',
      // 'tests/20_js/**/*.js',
      'tests/20_js/**/test_*.js',
      { pattern : 'tests/20_js/mocks/*.json', watched : true, served : true, included : false }
    ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

    browsers: [ 'Firefox', 'Chrome' ], // See later

    junitReporter : {
      outputFile : 'tmp/js/unit.xml',
      suite : 'unit'
    },

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

    coverageReporter: {
      type : 'html',
      dir : 'tmp/js/'
    }

    // htmlReporter: {
    //   outputDir: 'tmp',
    //   templatePath: '../tmp/jasmine_template.html'
    // }
  };

  config.set(configuration);
};
