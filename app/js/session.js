
import duix from '../../node_modules/duix/index.js';
import { routeToLogin } from './router.js';
const SESSION = 'session';

// Thanks to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(object) {
    var propNames = Object.getOwnPropertyNames(object);
    for (let name of propNames) {
        let value = object[name];

        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}

export function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

/**
 * 
 * @param {function(any): any} valueCb - Extract the value from the session
 * @param {function(any, any): any} cb - The callback that will be called with the new value
 */
export function filterOnValue(valueCb, cb) {
    let oldValue = Symbol('undefined'); // To make the difference between undefined and never initialized
    return duix.subscribe(SESSION, session => {
        let newValue = valueCb(session);
        if (oldValue === newValue) {
            return;
        }
        cb(newValue, oldValue);
        oldValue = newValue;
    }, {
        callMeNow: true, /* TODO: legacy name */
        fireImmediately: true
    });
}

export function setSession(session = null) {
    console.error('Set Session: ', JSON.stringify(session).substring(0, 50));
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

export const getSession = () => duix.get(SESSION);
/**
 * 
 * @param {function} cb
 * @return {function} unregistering functino
 */
export const onSession = (cb) => duix.subscribe(SESSION, cb, { callMeNow: true, fireImmediately: true }); /* TODO: legacy arg name */

/*
 * Functions
 */

export const getUsername = (session = getSession()) => session?.username;
export const getAuthorized = (key, session = getSession()) => session?.authorized?.includes(key) || false;

/**
 * Current folder (TODO: legacy)
 * @obsolete
 */
const FOLDER = 'FOLDER'
export const setCurrentFolder = (value = null) => duix.set(FOLDER, value);
export const getCurrentFolder = () => duix.get(FOLDER);
export const onCurrentFolder = (cb) => duix.subscribe(FOLDER, cb);

setSession();

routeToLogin();
