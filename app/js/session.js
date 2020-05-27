
import duix from '../../node_modules/duix/index.js';
const SESSION = 'session';

import store, { ACT_USER_LOGIN, ACT_USER_LOGOUT } from './store.js';

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

/**
 * 
 * @param {function(any): any} valueCb - Extract the value from the session
 * @param {function(any): any} cb - The callback that will be called with the new value
 */
function filterOnValue(valueCb, cb) {
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
    if (!session || Object.keys(session).length < 1) {
        session = null;
    } else {
        deepFreeze(session);
    }

    duix.set(SESSION, session);

    // TODO: legacy store
    if (session) {
        store.dispatch({ type: ACT_USER_LOGIN, payload: session });
    } else {
        store.dispatch({ type: ACT_USER_LOGOUT });
    }
}
setSession();

export const getSession = () => duix.get(SESSION);
export const onSession = (cb) => duix.subscribe(SESSION, cb, { callMeNow: true, fireImmediately: true }); /* TODO: legacy arg name */

/*
 * Username
 */

export const getUsername = (session = getSession()) => session?.username;
export const onUsername = (cb) => filterOnValue(getUsername, cb);

/*
 * Authorizations
 */

export const getAuthorized = (key, session = getSession()) => session?.authorized?.includes(key) || false;
export const onAuthorized = (key, cb) => filterOnValue(session => getAuthorized(key, session), cb);
