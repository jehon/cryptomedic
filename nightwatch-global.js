
module.exports = {
	// External before hook is ran at the beginning of the tests run, before creating the Selenium session
	before: function(done) {
		require('kill-by-port').killByPort(4444);
		done();
	}
};
