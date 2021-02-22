
import FolderPage from '../models/FolderPage.js';

/**
 * @param {string} pathname to be set
 * @returns {string} the same hash
 */
export function setLocation(pathname) {
    return document.location = pathname;
}


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
 * @param {string} route - the route to be parsed
 *
 * @see routeToLogin
 *
 * @returns {object} the route parsed
 */
export function parseRouteLogin(route = getCurrentRoute()) {
    return {
        redirect: route.replace(/^(\/+login)+\/+/, '/')
    };
}

/**
 * @param {number} folderId - the folder to display
 * @param {boolean} edit - whether the page is in edit mode or not
 * @returns {string} the route
 */
export function getRouteToFolderPatient(folderId, edit = false) {
    return '/folder/' + folderId + (edit ? '/edit' : '');
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

/**
 * @param {string} reportName - the name of the report
 *
 * @returns {string} the route
 */
export function getRouteToReport(reportName) {
    return `/reports/${reportName}`;
}

/**
 * @param {string} route - the route to be parsed
 * @see getRouteToReport
 *
 * @returns { object } the route parsed
 */
export function parseRouteReport(route = getCurrentRoute()) {
    return {
        report: route.replace(/^\/reports\//, '')
    };
}
