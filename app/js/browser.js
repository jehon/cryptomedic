
import hash from './hash.js';

if (!('browserUUID' in localStorage)) {
    localStorage.browserUUID = hash(navigator.userAgent + ':' + new Date());
    console.info('Generated browser UUID: ', localStorage.browserUUID);
}

export const browserUUID = localStorage.browserUUID;

/**
 * @returns {boolean} true if we are in production (non "localhost")
 */
export function isProduction() {
    /* istanbul-ignore-next */
    return window.location.host.substr(0, 'localhost'.length) != 'localhost';
}
