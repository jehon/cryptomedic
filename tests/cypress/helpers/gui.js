
import escapeStringRegexp from '../../../node_modules/escape-string-regexp/index.js';

export function guiAcceptAlert(cb = (_txt) => { }) {
    cy.on('window:alert', (txt) => cb(txt));
    cy.log('Alert accepted');
}

export function guiHashStartWith(hash, strict = false) {
    cy.hash().should('match',
        new RegExp(`^#${escapeStringRegexp(hash)}${strict ? '' : '([/].*)?'}([?].*)?$`)
    );
}
