/// <reference types="Cypress" />

Cypress.Commands.add('crFormFillIn', { prevSubject: true },
    (subject, fields) => {
        cy.wrap(subject).should('be.visible');

        for (const f in fields) {
            cy.wrap(subject).find(f).as('element');

            cy.get('@element').should('be.visible');

            cy.get('@element').invoke('focus');

            if (fields[f] === true) {
                cy.get('@element').click();
            } else if (fields[f] === false) {
                // no action needed
            } else if (typeof (fields[f]) == 'object') {
                for (let k of Object.keys(fields[f])) {
                    cy.get('@element')
                        .invoke('attr', k, fields[f][k]);
                }
            } else if (f.substring(0, 6) == 'select') {
                //         this.mySelect(fsel, fields[f]);
            } else {
                cy.get('@element')
                    .clear()
                    .type(fields[f])
                    .then(el => {
                        el.value = fields[f];
                        // JHElement.fireOn(el, 'change');
                        // JHElement.fireOn(el, 'blur');
                    });
            }

            // client.Keys.TAB
            // cy.get('@element').tab(); cypress-plugin-tab

            // Loose focus on element
            // this.execute(function (fsel) { document.querySelector(fsel).blur(); }, [fsel]);
            cy.log('Form filled in with', fields);
        }
    }
);
