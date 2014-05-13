module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
//    concat: {
//      options: {
//        separator: ';'
//      },
//      dist: {
//        src: ['src/**/*.js'],
//        dest: 'dist/<%= pkg.name %>.js'
//      }
//    },
    
	    projectUpdate: {
	        update: {
	            npm: true,
	            bower: true
	        }
	    },
	    bowerInstall: {
	    	// http://gruntjs.com/creating-tasks
	        testing: {
	        	src: [ 'tests/index.html' ],
	        }
	    },
	    jshint: {
	        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
	        options: {
	          // options here to override JSHint defaults
				// globals: {
				// 	jQuery: true,
				// 	console: true,
				// 	module: true,
				// 	document: true
				// }
	       	}
	   	},
		qunit: {
			files: [ 'tests/**/*.html' ]
		},
		// watch: {
		//  files: ['<%= jshint.files %>'],
		//  tasks: [ 'jshint', 'qunit' ]
		// },
	});

	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-project-update'); // -> projectUpdate
	//grunt.loadNpmTasks('grunt-bower-task'); // -> bowerInstall
	//grunt.loadNpmTasks('grunt-bower-install'); // -> bowerInstall
	grunt.loadNpmTasks('grunt-contrib-jshint'); // -> jshint
	grunt.loadNpmTasks('grunt-contrib-qunit'); // -> qunit
	grunt.loadNpmTasks('grunt-contrib-watch'); // -> watch

	grunt.registerTask('update', [ 'projectUpdate', 'default' ]);
	grunt.registerTask('default', [ 'jshint', 'qunit', 'bowerInstall' ]);
};
