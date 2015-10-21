// https://www.npmjs.com/package/gulp-param
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

//---------------- JS ---------------------------
gulp.task('test-js', function() {
    return gulp.src('')
    .pipe(plugins.nightwatch({
		configFile : 'tests/nightwatch.json'
    }))
	;
});

//---------------- BROWSERS ---------------------------

gulp.task('test-chrome', function() {
    return gulp.src('')
    .pipe(plugins.nightwatch({
		configFile : 'tests/nightwatch.json',
		cliArgs : [ '--env chrome' ]

    }))
	;
});

gulp.task('test-phantomjs', function() {
    return gulp.src('')
    .pipe(plugins.nightwatch({
	configFile : 'tests/nightwatch.json',
	cliArgs : [ '--env phantomjs' ]
    }))
});

gulp.task('test-live', function() {
    return gulp.src('')
    .pipe(plugins.nightwatch({
	configFile : 'tests/nightwatch.json',
	cliArgs : [ '--env live', '--tags readonly' ]
    }))
});

gulp.task('release-prepare-sonar', [ 'test' ], function(result) {
    var package_json = JSON.parse(require('fs').readFileSync('package.json', 'utf8'));
    var spawn = require('child_process').spawn;
    var sr = spawn('sonarrunner',
	    [
	      '-Dsonar.projectVersion=' + package_json.version,
	      '-Dproject.settings=tests/sonar-project.properties',
	      '-Dsonar.scm.disabled=true'
	    ],
	    {
		stdio: 'inherit'
	    });
    sr.on('exit', function(returnCode) {
	console.log(returnCode);
	result();
    });
});

// ---------------- GENERIC TASKS ---------------------------
gulp.task('help', plugins.taskListing);
gulp.task('default', [ 'help' ]);
