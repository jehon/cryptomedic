
export function guiAcceptAlert(cb = (_txt) => { }) {
    cy.on('window:alert', (txt) => cb(txt));
    cy.log('Alert accepted');
}
