/* global JHElement */
/* global readJSON */
/* global withHtml */
/* exported loadReference, webDescribe, extractPath */

function loadReference(name) {
	// Thanks to http://stackoverflow.com/a/27830579/1954789
	let valid_respond = readJSON('api/' + API_VERSION + '/tests/references/' + name);
	expect(valid_respond).not.toBeNull('The reference ' + name + ' is empty or not found');
	return valid_respond;
}

/* TODO: DEPRECATED */
/* map old version to new one */
function webDescribe(title, options, fn) {
	if (typeof(options) == 'object') {
		return withHtml(Object.assign({ title }, options), fn);
	}
	return withHtml({ title, html: options }, fn);
}

function extractPath(url) {
	return url.replace(/^http.?:\/\/localhost:[0-9]+/, '');
}

it('with extractPath', function() {
	expect(extractPath('http://localhost:9876/test')).toBe('/test');
	expect(extractPath('https://localhost:9876/test')).toBe('/test');

	// invalid
	expect(extractPath('xhttp://localhost:9876/test')).toBe('xhttp://localhost:9876/test');
});
