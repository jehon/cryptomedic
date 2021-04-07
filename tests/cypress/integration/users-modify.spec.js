
function getRowByUsername(username) {
    return cy.get('x-page-users-list x-table[count]:not([count=0])').find('tr').find('td').contains(username).parent();
}

context('Actions', () => {
    const username = 'cypress_user_modify_spec';

    before(() => {
        // Delete previously create user
        cy.crLogin('jehon');
        cy.crApi({ url: 'users' })
            .then(response => response.body)
            .then(data => data.filter(l => l.username == username).map(l => l.id)
                .forEach(id => cy.crApi({ url: `users/${id}`, method: 'DELETE' }))
            );
        cy.crGo('/users');
        cy.get('x-page-users-list').should('be.visible');
        cy.crReady(); // Not necessary?
    });

    it('list users', () => {
        // Check the data's
        getRowByUsername('ershad').find('td:nth-child(1)').should('contains.text', '105');
        getRowByUsername('ershad').find('td:nth-child(2)').should('contains.text', 'ershad');
        cy.crCompareSnapshot();
        // });

        // it('crud', () => {
        // Add a user
        cy.get('x-page-users-list').find('x-button#add').click();
        cy.get('x-page-user-edit').find('[name="username"]').type(username);
        cy.get('x-page-user-edit').find('[name="name"]').type('Cypress');
        cy.crCompareSnapshot('read');

        cy.get('x-page-user-edit').find('x-button[action="commit"]').click();

        // Add a user: confirm
        cy.get('x-page-user-edit').find('x-confirmation').shadow().find('x-button').click();

        // Find back in the menu
        getRowByUsername(username).find('x-button#pwd').click();

        // Set a password
        cy.get('x-page-user-password').get('[name="password"]').type('test');
        cy.crCompareSnapshot('password');
        cy.get('x-page-user-password').find('x-button[action="commit"]').click();

        // // Test login (logout)
        // cy.get('x-user-status').find('x-button').click();
        // cy.crLogin(username, 'test');

        // // Ok, come back
        // cy.get('x-user-status').find('x-button').click();

        // Login as admin
        // cy.crLogin('jehon');
        cy.crGo('/users');

        getRowByUsername(username).find('x-button#edit').click();

        // Edit it back
        cy.get('x-page-user-edit').find('[name="username"]').should('contain.value', username);

        // Delete it
        cy.get('x-page-user-edit').find('x-button[action="delete"]').click();
        // Delete it: confirm
        cy.crCompareSnapshot('delete-confirm');
        cy.get('x-page-user-edit').find('x-confirmation').shadow().find('x-button').click();
    });
});
