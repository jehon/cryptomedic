
export function crLogin(username, password = null) {
    crLogout();
    crApi({
        url: 'auth/mylogin', method: 'POST', body: {
            username: username ?? 'murshed',
            password: password ?? 'p'
        }
    });

    cy.visit('/build/');
    cy.hash().should('routeStartsWith', '/home');
    cy.get('x-user-status #user').should('have.text', username);

    crReady();
    cy.log(`Logged in as ${username} successfully`);
}
crLogin.PHYSIO = 'murshed';
crLogin.RO = 'readonly';
crLogin.ADMIN = 'jehon';

export function crLogout() {
    crApi({
        url: 'auth/logout',
    });
    cy.log('Logged out successfully');
}

export function crReady() {
    cy.get('x-requestor[running]', { includeShadowDom: true })
        .should('not.exist');

    // See
    cy.get('img', { includeShadowDom: true })
        .filter('[src]')
        .filter(':visible')
        // TODO: remove logs
        .should((imgs) => imgs.map((i, /** @type {HTMLImageElement} */ img) => expect(img.naturalWidth).to.be.greaterThan(0, 'loaded: ')));
    cy.log('Ready!');
}

export function crGo(route) {
    cy.visit(`/build/#${route}`);
    crReady();
    cy.log(`Gone to ${route} successfully`);
}

//
// https://docs.cypress.io/api/commands/request
//
/**
 * @param {object} options
 * @property {string} url of the call
 * @property {string?} method of the call
 */
export function crApi(options = {}) {
    return cy.request({
        ...options,
        url: options.url[0] == '/' ? options.url : `/api/v1.3/${options.url}`
    });
}

export function crPatientDelete(entryyear, entrynumber) {
    // Delete previously create user
    crLogin(crLogin.PHYSIO);
    crApi({ url: `reference/${entryyear}/${entrynumber}` })
        .then(response => response.body)
        .then(folder => {
            if (folder?.id > 0) {
                return crApi({ url: `fiche/patients/${folder.id}`, method: 'DELETE' });
            }
        });

}
