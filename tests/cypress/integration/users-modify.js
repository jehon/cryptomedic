
import { getTestTimestamp } from '../helpers/helpers.js';

context('Actions', () => {
    it('works also with cr-login', () => {
        const nickname = 'cypress_' + getTestTimestamp();

        cy.crLogin('jehon');
        cy.crGo('/users');

        // Check the data's
        cy.get('table tr:nth-child(5)').as('ershad');
        cy.get('@ershad').find('td:nth-child(1)').should('contains.text', '105');
        cy.get('@ershad').find('td:nth-child(2)').should('contains.text', 'ershad');
        cy.screenshot();

        // Add a user
        cy.get('x-page-users-list').find('x-button#add').click();
        cy.get('x-page-user-edit').find('[name="username"]').type(nickname);
        cy.get('x-page-user-edit').find('[name="name"]').type('Cypress ' + getTestTimestamp());
        cy.screenshot();

        cy.get('x-page-user-edit').find('x-button[action="commit"]').click();
        // Add a user: confirm
        cy.get('x-page-user-edit').find('x-confirmation').shadow().find('x-button').click();

        // Find back in the menu
        cy.get('x-page-users-list').find('tr').find('td').contains(nickname).parent().as('newUser');
        cy.get('@newUser').find('x-button[action="move"]').contains('Edit').click();

        // Edit it back
        cy.get('x-page-user-edit').find('[name="username"]').should('contain.value', nickname);

        // Delete it
        cy.get('x-page-user-edit').find('x-button[action="delete"]').click();
        // Delete it: confirm
        cy.get('x-page-user-edit').find('x-confirmation').shadow().find('x-button').click();

        // Back in the menu: not found
        cy.get('x-page-users-list').find('tr').find('td').contains(nickname).should('not.exist');
    });
});
