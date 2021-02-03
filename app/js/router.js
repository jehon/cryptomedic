
import { API_VERSION } from '../config.js';
import FolderPage from '../models/FolderPage.js';

/**
 * @returns {string} the current route
 */
export function getCurrentRoute() {
    return document.location.hash.substr(1);
}

/**
 * @param {string} hash to be set
 * @returns {string} the same hash
 */
export function setRoute(hash) {
    return document.location.hash = hash;
}

/**
 * Route to the login form
 *
 * @param {string} redirect is the current route to redirect to when login complete
 */
export function routeToLogin(redirect = getCurrentRoute()) {
    if (redirect.startsWith('/login/')) {
        return;
    }
    setRoute(`/login/${redirect}`);
}

/**
 * @see routeToLogin
 * @returns {object} the route parsed
 */
export function parseRouteLogin() {
    return {
        redirect: getCurrentRoute().replace(/^(\/+login)+\/+/, '/')
    };
}

/**
 * Used for logout and some advanced routes
 *
 * @returns {object} the route parsed
 */
export function parseRouteApi() {
    return {
        redirect: '/api/' + API_VERSION + getCurrentRoute().replace(/^(\/+redirect\/api)+\/+/, '/')
    };
}

/**
 * @param {FolderPage} folderPage - the file to display
 * @returns {string} the route
 */
export function getRouteToFolderFile(folderPage) {
    return '/folder/' + folderPage.patient_id + '/file/' + folderPage.getModel() + '/' + folderPage.id;
}

/**
 * @param {number} folderId - the folder of wich to show the patient
 */
export function routeToFolderPatient(folderId) {
    setRoute(`/folder/${folderId}`);
}
/**
 * @param {number} folderId - the folder where to add
 * @param {string} type - the type (string name of the class)
 * @returns {string} the route
 */
export function getRouteToFolderAdd(folderId, type) {
    return `/folder/${folderId}/file/${type}`;
}

/**
 * Get a route to the creation of a folder
 *
 * @returns {string} the route
 */
export function getRouteToCreateReference() {
    return '/folder/-1/edit';
}
