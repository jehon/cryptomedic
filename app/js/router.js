import { API_VERSION } from '../config.js';

// export default function route() {
// }

export function getCurrentRoute() {
    return document.location.hash.substr(1);
}

export function setRoute(hash) {
    return document.location.hash = hash;
}

export function routeToLogin(redirect = getCurrentRoute()) {
    setRoute(`/login/${redirect}`);
}

export function parseRouteLogin() {
    return {
        redirect: getCurrentRoute().substring(('/login/').length)
    };
}

/* istanbul ignore next: impossible to cover location change */
export function routeToLogout(reason) {
    /* istanbul ignore next: impossible to cover location change */
    document.location.assign(`/api/${API_VERSION}/auth/logout?reason=${reason}`);
}
