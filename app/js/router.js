
import { API_VERSION } from '../config.js';

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
        redirect: getCurrentRoute().replace(/^(\/+login)+\/+/, '/')
    };
}

export function parseRouteApi() {
    return {
        redirect: '/api/' + API_VERSION + getCurrentRoute().replace(/^(\/+redirect\/api)+\/+/, '/')
    };
}
