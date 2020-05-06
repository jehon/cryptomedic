
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
