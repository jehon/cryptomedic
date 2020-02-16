/* global JHElement */
/* global readJSON, API_VERSION */
/* exported loadReference, webDescribe, extractPath */

import { API_VERSION } from '../../app/config.js';

export function loadReference(name) {
	// Thanks to http://stackoverflow.com/a/27830579/1954789
	let valid_respond = readJSON('www/api/' + API_VERSION + '/tests/references/' + name);
	expect(valid_respond).not.toBeNull('The reference ' + name + ' is empty or not found');
	return valid_respond;
}

export function extractPath(url) {
	return url.replace(/^http.?:\/\/localhost:[0-9]+/, '');
}
