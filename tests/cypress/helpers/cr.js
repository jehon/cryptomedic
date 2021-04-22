
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
}
crLogin.PHYSIO = 'murshed';
crLogin.RO = 'readonly';
crLogin.ADMIN = 'jehon';

export function crLogout() {
    crApi({
        url: 'auth/logout',
    });
}

export function crReady() {
    cy.get('x-requestor[running]', { includeShadowDom: true })
        .should('not.exist');

    // See
    cy.get('img', { includeShadowDom: true })
        .filter('[src]')
        .filter(':visible')
        .should((imgs) => imgs.map((i, /** @type {HTMLImageElement} */ img) => expect(img.naturalWidth).to.be.greaterThan(0)));
}

export function crGo(route) {
    cy.visit(`/build/#${route}`);
    crReady();
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
