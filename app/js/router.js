
import { API_VERSION } from '../config.js';

let mockEnabled = {
    routeToLogout: false
}

export function mock(route) {
    console.info(`Mocking route ${route}`);
    mockEnabled[route] = true;
}

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

export function routeToLogout(reason) {
    /* istanbul ignore else: impossible to cover location change */
    if (mockEnabled.routeToLogout) {
        return;
    }
    /* istanbul ignore next: impossible to cover location change */
    document.location.assign(`/api/${API_VERSION}/auth/logout?reason=${reason}`);
}
