
import store, { ACT_USER_LOGIN } from './store.js';

let sessionResolve = false;
let sessionPromise = null;
let sessionIsResolved = false;

export async function getSession() {
    return sessionPromise;
}

export async function getUsername() {
    return getSession()
        .then(data => data.username);
}

export function setSession(session) {
    if (sessionIsResolved) {
        throw new Error('Impossible to set the session twice!');
    }
    sessionIsResolved = true;

    // TODO: legacy
    store.dispatch({ type: ACT_USER_LOGIN, payload: session });

    // Store the value inside the promise (built by resetSession)
    sessionResolve(session);
}

export function _resetSession() {
    sessionPromise = new Promise(resolve => {
        sessionResolve = resolve;
    });
    sessionIsResolved = false;
}

_resetSession();
