
// Unused

// https://github.com/nightwatchjs/nightwatch/issues/192
var util = require('util');
exports.assertion = function(selector, content, msg) {

	this.message = msg || util.format('Testing the <%s>.', fn);

	this.expected = true;

	this.pass = function(value) {
		return value === this.expected;
	};

	this.value = function(result) {
		return result.value;
	};

	this.command = function(callback) {
		// fn = 
		// args = [ , , ,  ]
		return this.api.execute(fn, args, callback);
	};

};