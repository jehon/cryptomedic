var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// var browserSync = require('browser-sync').create();
//gulp.task('serve', [ 'sass' ], function() {
//    browserSync.init({
//	server : "./app"
//    });
//
//    gulp.watch("app/scss/*.scss", [ 'sass' ]);
//    gulp.watch("app/*.html").on('change', reload);
//});

gulp.task('help', plugins.taskListing);

gulp.task('test', function() {
    gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.nightwatch({
		configFile : 'test/nightwatch.json'
    	}))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

gulp.task('test-phantomjs', function() {
    gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.nightwatch({
	configFile : 'test/nightwatch.json',
	cliArgs : [ '--env phantomjs' ]
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

gulp.task('test-live', function() {
    gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.nightwatch({
	configFile : 'test/nightwatch.json',
	cliArgs : [ '--env live' ]
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

// gulp.task('checkcss', function () {
// gulp.src('css/**/*.css')
// .pipe(watch('css/**/*.css'))
// .pipe(gulp.dest('build'));
// });

gulp.task('default', [ 'help' ]);
