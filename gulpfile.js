// https://www.npmjs.com/package/gulp-param
//var gulp = require('gulp-param')(require('gulp'), process.argv);
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

/*
 * TODO: gulp-release-tasks
 */
var exitStatus = 0;
process.on('exit', function (status) {
	if (status < exitStatus) {
	    process.exit(exitStatus);
	}
});

/*
 * Some variables
 */
//var allCSS = [ 
//               "app/bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css",
//               "app/bower_components/bootstrap/dist/css/bootstrap.min.css",
//               "app/static/css/application.css" 
//              ];
//
//var allJS = [
//             "app/bower_components/jquery/dist/jquery.min.js",
//             "app/bower_components/jquery-ui/jquery-ui.min.js",
//             "app/bower_components/modernizr/modernizr.js",
//             "app/bower_components/bootstrap/dist/js/bootstrap.min.js",
//             "bower_components/angular/angular.min.js",
//             "bower_components/angular-route/angular-route.min.js",
//             "bower_components/excellentexport/excellentexport.min.js",
//             "app/static/js/application.js", 
//             "app/static/js/cryptomedic.js", 
//             "app/static/js/amd_stats_datas.js",
//             "app/static/js/exceptions.js",
//             "app/static/js/model_*.js",
//             "app/static/js/service_*.js",
//             "app/static/js/ctrl_*.js"
//             ];

gulp.task('help', plugins.taskListing);

gulp.task('test-php', function() {
    gulp.src('rest/phpunit.xml')
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
        .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    	.pipe(plugins.phpunit('./vendor/bin/phpunit', { notify: true }))
    	.pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
});

gulp.task('test-js', [ 'test-php' ], function() {
    return gulp.src('')
    .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
		configFile : 'test/nightwatch.json'
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
	;
});

gulp.task('test-chrome', function() {
    return gulp.src('')
    .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
		configFile : 'test/nightwatch.json',
		cliArgs : [ '--env chrome' ]

    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
	;
});

gulp.task('test', [ 'test-js', 'test-php' ]);

gulp.task('test-phantomjs', function() {
    return gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
	configFile : 'test/nightwatch.json',
	cliArgs : [ '--env phantomjs' ]
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

gulp.task('test-live', function() {
    return gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
	configFile : 'test/nightwatch.json',
	cliArgs : [ '--env live', '--tags readonly' ]
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

//gulp.task('minify-css', function() {
//    gulp.src(allCSS, { base: __dirname + '/cache' })
//    	.pipe(plugins.sourcemaps.init())
//    	.pipe(plugins.concatCss('application.min.css'))
//    	.pipe(plugins.minifyCss())
//    	.pipe(plugins.sourcemaps.write()) //'cache/application.min.css.map'
//    	.pipe(gulp.dest('cache/'));
//});
//
//gulp.task('minify-js', function() {
//    gulp.src(allJS)
//        .pipe(plugins.sourcemaps.init())
//        .pipe(plugins.concat('application.min.js'))
//        .pipe(plugins.uglify())
//        .pipe(plugins.sourcemaps.write())
//        .pipe(gulp.dest('cache/'));
//});
//
//gulp.task('watch', [ 'minify-css', 'minify-js' ], function() {
//    gulp.watch(allCSS, [ 'minify-css' ])
//    	.on('change', function(event) {
//    	    console.log('CSS File ' + event.path + ' was ' + event.type + ', running tasks...');
//    	});
//    gulp.watch(allJS, [ 'minify-js' ])
//	.on('change', function(event) {
//	    console.log('JS File ' + event.path + ' was ' + event.type + ', running tasks...');
//	});
//
//})

gulp.task('default', [ 'help' ]);
