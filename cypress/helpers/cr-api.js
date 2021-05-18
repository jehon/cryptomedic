/// <reference types="Cypress" />

/**
 * Make an api call
 *
 * @param {object} options
 * @property {string} url of the call (relative to version if relative)
 * @property {string?} method of the call
 * @see https://docs.cypress.io/api/commands/request
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
    const realPassword = password ?? 'p';

    cy.log(`Doing crApiLogin: ${realUser} / ${realPassword}`);
    crApi({
        url: 'auth/mylogin', method: 'POST', body: {
            username: realUser,
            password: realPassword
        }
    });

    cy.log(`Done crApiLogin: ${realUser}`);
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
    cy.log('Done crApiLogout');
}

/**
 * Get the price list
 *
 * @returns {Cypress.Chainable<*>} Promise to price list
 */
export function crApiFolderGet(id) {
    cy.log('Doing crApiFolderGet');
    return crApi({ url: `folder/Patient/${id}` })
        .then(response => response.body)
        .then(data => {
            cy.log('Done crApiFolderGet: ', data);
        });
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
    cy.log(`Doing crApiPatientDelete: ${entryyear} / ${entrynumber}`);
    crApi({ url: `reference/${entryyear}/${entrynumber}` })
        .then(response => response.body)
        .then(folder => {
            if (folder?.id > 0) {
                return crApi({ url: `fiche/patients/${folder.id}`, method: 'DELETE' });
            }
        });
    cy.log(`Done crApiPatientDelete: ${entryyear} / ${entrynumber}`);
}

/**
 * Update a Fiche
 *
 * @param {string} type to be updated
 * @param {number|string} id to be updated
 * @param {object} data to be set
 */
export function crApiFicheModify(type, id, data) {
    // Modify a file
    cy.log(`Doing crApiFicheModify: ${type}#${id}`);
    crApi({ url: `fiche/${type}/${id}`, method: 'PUT', data });
    cy.log(`Done crApiFicheModify: ${type}#${id}`);
}

/**
 * Delete a Fiche
 *
 * @param {string} type to be updated
 * @param {number|string} id to be updated
 */
export function crApiFicheDelete(type, id) {
    // Modify a file
    cy.log(`Doing crApiFicheDelete: ${type}#${id}`);
    const apiTypes = {
        Appointment: 'appointments',
        Bill: 'bills',
        ClubFoot: 'clubfeet',
        OtherConsult: 'otherconsults',
        Payment: 'payments',
        Picture: 'pictures',
        RicketConsult: 'ricketconsults',
        Surgery: 'surgeries',
    };

    if (!apiTypes[type]) {
        throw new Error(`No mapping found for ${type}`);
    }

    crApi({ url: `fiche/${apiTypes[type]}/${id}`, method: 'DELETE' });
    cy.log(`Done crApiFicheDelete: ${type}#${id}`);
}

/**
 * Get the price list
 *
 * @returns {Cypress.Chainable<*>} Promise to price list
 */
export function crApiPriceList() {
    cy.log('Doing crApiPriceList');
    return crApi({ url: 'admin/prices' })
        .then(response => response.body)
        .then(data => {
            cy.log('Done crApiPriceList: ', data);
        });
}

export function crApiPriceDelete(id) {
    cy.log(`Doing crApiPriceDelete: ${id}`);
    crApi({ url: `admin/prices/${id}`, method: 'DELETE' });
    cy.log(`Done crApiPriceDelete: ${id}`);
}

export function crApiUserDelete(username) {
    crApi({ url: 'users' })
        .then(response => response.body)
        .then(data => data.filter(l => l.username == username).map(l => l.id)
            .forEach(id => crApi({ url: `users/${id}`, method: 'DELETE' }))
        );
    cy.log(`Done crApiUserDelete: ${crApiUserDelete}`);
}
