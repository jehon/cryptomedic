// https://www.npmjs.com/package/gulp-param
//var gulp = require('gulp-param')(require('gulp'), process.argv);
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var shelljs = require('shelljs');
var path = require("path");

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

//---------------- CACHE ---------------------------

gulp.task('cache-clean', function(cb) {
    //shelljs.rm("-fr", "cache/templates/*");
    //shelljs.rm("-fr", "cache/manifest.manifest");
});

gulp.task('cache-test', function() {
    gulp.src('tests/cache-test/phpunit.xml')
    	.pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
    	.pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    	.pipe(plugins.phpunit('./tests/libs/bin/phpunit', { notify: true }))
//    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
});

gulp.task('cache-watch', function() {
    //gulp.watch([ 'cache_generator/generator.php', 'php/**/*' ], [ 'cache-clean' ], function(event) {
    //});
    
    //gulp.watch([ 'cache_generator/**/*', 'app/**/*' ], null, function(event) {
	//shelljs.rm("-f", "cache/manifest.manifest");
    //});

    //gulp.watch([ 'cache_generator/templates.php', 'cache_generator/templates/**/*.php' ], null, function(event) {
    //	var html = __dirname + "/cache" + path.relative(__dirname, event.path).substring("cache_generator".length).replace(".php", ".html");
    //	shelljs.rm("-fr", html);
    //});
});

// ---------------- REST ---------------------------

gulp.task('rest-test', [ 'cache-test' ], function() {
    gulp.src('rest/phpunit.xml')
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
        .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    	.pipe(plugins.phpunit('./tests/libs/bin/phpunit', { notify: true }))
});

//---------------- JS ---------------------------

gulp.task('test-js', [ 'rest-test', 'cache-test' ], function() {
    return gulp.src('')
    .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
		configFile : 'tests/nightwatch.json'
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
	;
});

//---------------- BROWSERS ---------------------------

gulp.task('test-chrome', function() {
    return gulp.src('')
    .pipe(plugins.plumber({ errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>") }))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
		configFile : 'tests/nightwatch.json',
		cliArgs : [ '--env chrome' ]

    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"))
	;
});

gulp.task('test-phantomjs', function() {
    return gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
	configFile : 'tests/nightwatch.json',
	cliArgs : [ '--env phantomjs' ]
    }))
    .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

gulp.task('test-live', function() {
    return gulp.src('')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error during task " + this.seq.slice(-1)[0] + ": <%= error.message %>")}))
    .pipe(plugins.plumber({ errorHandler: function() { process.exit(1); } }))
    .pipe(plugins.nightwatch({
	configFile : 'tests/nightwatch.json',
	cliArgs : [ '--env live', '--tags readonly' ]
    }))
   .pipe(plugins.notify(this.seq.slice(-1)[0] + ": done"));
});

//---------------- RELEASE MANAGEMENT ---------------------------

gulp.task('release-prepare-travis', function(result) {
    var fs = require('fs');
    var lint = require('travis-lint');
    lint(fs.readFileSync('.travis.yml'), function (err, warnings) {
	// warnings is an array of the issues with your yml file
	if (err) {
	    if (err.code && err.code == "EAI_AGAIN") {
		console.warn("!!!! Travis could not verify the file !!!!");
		return result(false);
	    } else {
		console.error("Travis-lint send back errors: ");
		console.error(err);
		return result("Travis file is incorrect");
	    }
	}
	if (warnings && warnings.length) {
	    console.warn("Travis-lint send back warnings: ");
	    console.warn(warnings);
	    return result("Travis file has warnings");
	}
	return result();
    });
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

gulp.task('release-prepare-dbstructure', function(result) {
    var spawn = require('child_process').spawn;
    var sr = spawn('php', 
	    [ 
	     	'scripts/dump.php'
	    ], 
	    {
		stdio: 'inherit'
	    });
    sr.on('exit', function(returnCode) {
	console.log(returnCode);
	result();
    });
});

gulp.task('release-prepare', [ 'test', 'release-prepare-travis', 'release-prepare-sonar', 'release-prepare-dbstructure' ]);


// ---------------- GENERIC TASKS ---------------------------

//gulp.task('test', [ 'test-js', 'test-php' ]);
gulp.task('help', plugins.taskListing);
gulp.task('clean', [ 'cache-clean' ]);
gulp.task('test', [ 'cache-test' ]);
gulp.task('watch', [ 'clean', 'cache-watch' ]);
gulp.task('eclipse-build', [ 'clean' ]);
gulp.task('default', [ 'help' ]);

























//gulp.task('release-prepare-database', function(result) {
//  var exec = require('child_process').exec;
//  exec('php php/dump.php', function (error, stdout, stderr) {
//	console.log('stdout: ' + stdout);
//	console.log('stderr: ' + stderr);
//	if (error !== null) {
//	    console.log('exec error: ' + error);
//	}
//  });
//});
//, 'release-prepare-database'

//gulp.task('minify-css', function() {
//  gulp.src(allCSS, { base: __dirname + '/cache' })
//  	.pipe(plugins.sourcemaps.init())
//  	.pipe(plugins.concatCss('application.min.css'))
//  	.pipe(plugins.minifyCss())
//  	.pipe(plugins.sourcemaps.write()) //'cache/application.min.css.map'
//  	.pipe(gulp.dest('cache/'));
//});
//
//gulp.task('minify-js', function() {
//  gulp.src(allJS)
//      .pipe(plugins.sourcemaps.init())
//      .pipe(plugins.concat('application.min.js'))
//      .pipe(plugins.uglify())
//      .pipe(plugins.sourcemaps.write())
//      .pipe(gulp.dest('cache/'));
//});

