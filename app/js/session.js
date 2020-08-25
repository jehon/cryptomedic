
import duix from '../../node_modules/duix/index.js';
import { routeToLogin } from './router.js';
const SESSION = 'session';

// Thanks to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
/**
 * @template {object} T
 * @param {T} object to be freezed
 * @returns {T} The object being freezed
 */
export function deepFreeze(object) {
    var propNames = Object.getOwnPropertyNames(object);
    for (let name of propNames) {
        let value = object[name];

        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}

/**
 * Make a deep copy of the object
 *
 * @template {object} T
 * @param {T} object to be copied
 * @returns {T} The object being copied
 */
export function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

// /**
//  *
//  * @param {function(any): any} valueCb - Extract the value from the session
//  * @param {function(any, any): any} cb - The callback that will be called with the new value
//  */
// export function filterOnValue(valueCb, cb) {
//     let oldValue = Symbol('undefined'); // To make the difference between undefined and never initialized
//     return duix.subscribe(SESSION, session => {
//         let newValue = valueCb(session);
//         if (oldValue === newValue) {
//             return;
//         }
//         cb(newValue, oldValue);
//         oldValue = newValue;
//     }, {
//         fireImmediately: true
//     });
// }

/**
 * @param {object} session - the object to be stored
 */
export function setSession(session = null) {
    if (!session || Object.keys(session).length < 1) {
        session = null;
    } else {
        deepFreeze(session);
    }

    duix.set(SESSION, session);

    if (!session) {
        setCurrentFolder();
    }
}

/**
 * @returns {object} the session
 */
export const getSession = () => duix.get(SESSION);

/**
 *
 * @param {function(object):any} cb - a callback that will be called on session change
 * @returns {function(void):void} unregistering function
 */
export const onSession = (cb) => duix.subscribe(SESSION, cb, { fireImmediately: true }); /* TODO: legacy arg name */

/*
 * Functions
 */

export const getUsername = (session = getSession()) => session?.username;
export const getAuthorized = (key, session = getSession()) => session?.authorized?.includes(key) || false;

/**
 * Current folder (TODO: legacy)
 */
const FOLDER = 'FOLDER';
export const setCurrentFolder = (value = null) => duix.set(FOLDER, value);
/* TODO: temp function *//* istanbul ignore next */
export const getCurrentFolder = () => duix.get(FOLDER);
/* TODO: temp function *//* istanbul ignore next */
export const onCurrentFolder = (cb) => duix.subscribe(FOLDER, cb);

setSession();

routeToLogin();
