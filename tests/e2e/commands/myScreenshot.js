
// // http://stackoverflow.com/a/37785920/1954789
// function userAgent(client) { // see: https://git.io/vobdn
// 	var a = client.options.desiredCapabilities;
// 	return (a.platform + '~' + a.browserName + '~' + a.version).replace(/ /g, '');
// }

var i = 0;

exports.command = function(testname = '', callback) {
	i++;
	const root = this.currentTest.module + '_' + this.currentTest.name;
	if (testname) {
		testname = root + '_' + testname;
	} else {
		testname = root + '_' + ('0000' + i).slice(-4);
	}
	testname = testname.replace(/\\/g, '_');
	testname = testname.replace(/[/]/g, '_');
	var scr = this.options.screenshotsPath + '/' + testname + '.png';

	this.saveScreenshot(scr, callback);
	return this;
};
