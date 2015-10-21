module.exports = function(config) {
  config.set({
    plugins : [
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-jasmine',
                'karma-junit-reporter',
                // 'karma-phantomjs-launcher',
                'karma-coverage',
                'karma-html-reporter'
    ],
    reporters : [
                  'progress',
                  // 'coverage'
//                  'html'
                 ],

    basePath : '../',

    files : [
              'app/bower_components/jQuery/dist/jquery.min.js',
              'app/bower_components/angular/angular.js',
              'app/bower_components/angular-route/angular-route.js',
              'app/bower_components/angular-mocks/angular-mocks.js',
              'app/js/**/*.js',
              'tests/js/**/*.js',
              { pattern : 'tests/js/mocks/*.json', watched : true, served : true, included : false }
            ],

    autoWatch : true,

    frameworks : [ 'jasmine' ],

    browsers: [ 'Chrome', "Firefox" ],

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
    },

    htmlReporter: {
      outputDir: 'tmp',
      templatePath: 'tmp/jasmine_template.html'
    }
  });
};
