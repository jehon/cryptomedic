
import duix from '../cjs2esm/duix.js';
const SESSION = 'session';
const USERNAME = 'username';

import store, { ACT_USER_LOGIN } from './store.js';

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

function onWithMemory(key, cb) {
    cb(duix.get(key));
    return duix.subscribe(key, cb);
}

export function setSession(session = {}) {
    if (Object.keys(session).length < 1) {
        session = null;
    } else {
        deepFreeze(session);
    }
    duix.set(USERNAME, session?.username);
    duix.set(SESSION, session);
    store.dispatch({ type: ACT_USER_LOGIN, payload: session });
}

export const onSession = (cb) => onWithMemory(SESSION, cb);
export const getSession = () => duix.get(SESSION);

export const onUsername = (cb) => onWithMemory(USERNAME, cb);
export const getUsername = () => duix.get(USERNAME);
