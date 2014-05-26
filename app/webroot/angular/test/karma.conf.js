module.exports = function(config) {
	config.set({
		plugins : [ 
		            'karma-chrome-launcher', 
		            'karma-firefox-launcher',
		            'karma-jasmine', 
		            'karma-junit-reporter',
		            //'karma-htmlfile-reporter' // html report
		],
		// https://www.npmjs.org/package/karma-htmlfile-reporter
		reporters : [ 
		              'progress', 
//		              'html' 
		             ],

		basePath : '../',

		files : [ 
		          'app/bower_components/angular/angular.js',
		          'app/bower_components/angular-route/angular-route.js',
		          'app/bower_components/angular-mocks/angular-mocks.js',
		          'app/js/**/*.js', 'test/unit/**/*.js', 
		          { pattern : 'test/mock/*.json', watched : true, served : true, included : false }
		        ],

		autoWatch : true,

		frameworks : [ 'jasmine' ],

		browsers : [ 'Chrome' ],

		junitReporter : {
			outputFile : 'test_out/unit.xml',
			suite : 'unit'
		},
		
//		htmlReporter : {
//			outputFile : 'test_out/html_unit.html'
//		}
	});
};
