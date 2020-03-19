
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
        throw new Error("Impossible to set the session twice!");
    }
    sessionIsResolved = true;
    sessionResolve(session);
}

export function resetSession() {
    sessionPromise = new Promise(resolve => {
        sessionResolve = resolve;
    });
    sessionIsResolved = false;
}

resetSession();
