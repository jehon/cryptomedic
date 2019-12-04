
const fse = require('fs-extra');
fse.emptyDirSync(__dirname + '/target/e2e');

module.exports = {
	// External before hook is ran at the beginning of the tests run, before creating the Selenium session
	before: function(done) {
		require('kill-by-port').killByPort(4444);

		done();
	}
};
