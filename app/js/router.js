
import { API_VERSION } from '../config.js';
import FolderPage from '../models/FolderPage.js';

/**
 *
 */
export function getCurrentRoute() {
    return document.location.hash.substr(1);
}

/**
 * @param hash
 */
export function setRoute(hash) {
    return document.location.hash = hash;
}

/**
 * @param redirect
 */
export function routeToLogin(redirect = getCurrentRoute()) {
    setRoute(`/login/${redirect}`);
}

/**
 *
 */
export function parseRouteLogin() {
    return {
        redirect: getCurrentRoute().replace(/^(\/+login)+\/+/, '/')
    };
}

/**
 *
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
    return `#/folder/${folderId}/file/${type}`;
}