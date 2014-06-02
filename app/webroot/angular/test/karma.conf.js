module.exports = function(config) {
	config.set({
		plugins : [ 
		            'karma-chrome-launcher', 
		            'karma-firefox-launcher',
		            'karma-jasmine', 
		            'karma-junit-reporter',
		            'karma-phantomjs-launcher',
//		            'karma-html-reporter' //  add to package.json: "karma-html-reporter": "latest" - https://www.npmjs.org/package/karma-html-reporter
		],
		reporters : [ 
		              'progress' 
//		              'html' 
		             ],

		basePath : '../',

		files : [ 
		          'app/bower_components/jQuery/dist/jquery.min.js',
		          'app/bower_components/angular/angular.js',
		          'app/bower_components/angular-route/angular-route.js',
		          'app/bower_components/angular-mocks/angular-mocks.js',
		          'app/js/**/*.js', 'test/unit/**/*.js', 
		          { pattern : 'test/mocks/*.json', watched : true, served : true, included : false }
		        ],

		autoWatch : true,

		frameworks : [ 'jasmine' ],

		browsers : [ 'Chrome', 'PhantomJS' ],

		junitReporter : {
			outputFile : 'test_out/unit.xml',
			suite : 'unit'
		},
//	    htmlReporter: {
//	        outputDir: 'output',
//	        templatePath: 'output/jasmine_template.html'
//	    }
	});
};
