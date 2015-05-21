var gulp        = require('gulp');
var nightwatch  = require('gulp-nightwatch');
//var browserSync = require('browser-sync').create();

//var plugins = require('gulp-load-plugins')();

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', reload);
});

gulp.task('test', function() {
	gulp.src('')
    	.pipe(nightwatch({
      		configFile: 'test/nightwatch.json'
    		}));
});

gulp.task('default', [ 'test' ]);

