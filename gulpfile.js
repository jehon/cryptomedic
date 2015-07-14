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

gulp.task('default', [ 'help' ]);
