
// http://stackoverflow.com/a/37785920/1954789
function userAgent(client) { // see: https://git.io/vobdn
	var a = client.options.desiredCapabilities;
	return (a.platform + '~' + a.browserName + '~' + a.version).replace(/ /g, '');
}

var i = 0;

exports.command = function(name, callback) {
	i++;
	var testname = ('0000' + i).slice(-4) + '_' + this.currentTest.module + '_' + this.currentTest.name;
	testname = testname.replace(/\\/g, '.');
	testname = testname.replace(/[/]/g, '.');
	var scr = this.options.screenshotsPath + '/' + testname + '.png';

	this.saveScreenshot(scr, callback);
	return this;
};
