
import { API_VERSION } from '../../app/config.js';
import _fireOn from '../../app/js/fire.js';

export const fireOn = _fireOn;

/**
 * @param name
 */
export function loadReference(name) {
    // Thanks to http://stackoverflow.com/a/27830579/1954789
    let valid_respond = readJSON('www/api/' + API_VERSION + '/tests/references/' + name);
    expect(valid_respond).not.toBeNull('The reference ' + name + ' is empty or not found');
    return valid_respond;
}

/**
 * @param url
 */
export function extractPath(url) {
    return url.replace(/^http.?:\/\/localhost:[0-9]+/, '');
}

/* TODO: DEPRECATED */
/* map old version to new one */
/**
 * @param title
 * @param options
 * @param fn
 */
export function webDescribe(title, options, fn) {
    if (typeof (options) == 'object') {
        return withHtml(Object.assign({ title }, options), fn);
    }
    return withHtml({ title, html: options }, fn);
}

/**
 * @param url
 */
export function fn(url) {
    return new URL(url).pathname.split('/').pop();
}
