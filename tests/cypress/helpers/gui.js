
import escapeStringRegexp from 'escape-string-regexp';

export function guiAcceptAlert(cb = (_txt) => { }) {
    cy.on('window:alert', (txt) => cb(txt));
    cy.log('Alert accepted');
}

export function guiHashStartWith(hash, strict = false) {
    cy.hash().should('match',
        new RegExp(`^#${escapeStringRegexp(hash)}${strict ? '' : '([/].*)?'}([?].*)?$`)
    );
}
