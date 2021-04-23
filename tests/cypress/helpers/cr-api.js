/// <reference types="Cypress" />

/**
 * Make an api call
 *
 * @see https://docs.cypress.io/api/commands/request
 *
 * @param {object} options
 * @property {string} url of the call (relative to version if relative)
 * @property {string?} method of the call
 */
export function crApi(options = {}) {
    return cy.request({
        ...options,
        url: options.url[0] == '/' ? options.url : `/api/v1.3/${options.url}`
    });
}

/**
 * Login using api
 *   and wait for "crReady"
 *
 * Please use crLogin.* constants for username
 *
 * @param {string?} username
 * @param {string?} password
 * @returns {string} the real user used
 */
export function crApiLogin(username = null, password = null) {
    const realUser = username ?? 'murshed';
    crApiLogout();
    crApi({
        url: 'auth/mylogin', method: 'POST', body: {
            username: realUser,
            password: password ?? 'p'
        }
    });
    return realUser;
}
crApiLogin.PHYSIO = 'murshed';
crApiLogin.RO = 'readonly';
crApiLogin.ADMIN = 'jehon';

/**
 * Logout using api
 *
 * Note that logout is automatically done through login.
 */
export function crApiLogout() {
    crApi({
        url: 'auth/logout',
    });
    cy.log('Logged out successfully');
}

/**
 * Delete a patient using the API
 *   !! It need to log as Admin to do that
 *
 * @param {string|number} entryyear  to be deleted
 * @param {string|number} entrynumber to be deleted
 */
export function crApiPatientDelete(entryyear, entrynumber = 1000) {
    // Delete previously create user
    crApiLogin(crApiLogin.ADMIN);
    crApi({ url: `reference/${entryyear}/${entrynumber}` })
        .then(response => response.body)
        .then(folder => {
            if (folder?.id > 0) {
                return crApi({ url: `fiche/patients/${folder.id}`, method: 'DELETE' });
            }
        });
}

export function crApiDeleteUsers(username) {
    crApiLogin(crApiLogin.ADMIN);
    crApi({ url: 'users' })
        .then(response => response.body)
        .then(data => data.filter(l => l.username == username).map(l => l.id)
            .forEach(id => crApi({ url: `users/${id}`, method: 'DELETE' }))
        );
}