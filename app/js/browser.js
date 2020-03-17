
import md5 from './md5.js';

if (!('browserUUID' in localStorage)) {
    localStorage.browserUUID = md5(navigator.userAgent + ':' + new Date());
    console.info('Generated browser UUID: ', localStorage.browserUUID);
}

export const browserUUID = localStorage.browserUUID;

export function isProduction() {
    return window.location.host.substr(0, 'localhost'.length) != 'localhost';
}
