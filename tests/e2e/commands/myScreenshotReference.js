
exports.command = function(name, _callback) {
	this.myScreenshot('reference' + (name ? '_' + name : ''));
};
