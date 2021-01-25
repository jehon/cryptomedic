
/* global JHElement */

module.exports = {
    wrong_password: function (client) {
        client.page.cryptomedic().authenticate_fillIn('user_that_does_not_exists_at_all');

        client.myScreenshotReference();

        client.myComponentExecute('x-login-form x-messages', function () {
            return this.messagesCount;
        }, [], function (result) {
            client.assert.equal(result, 1);
        });
    },

    authenticate_multiple: function (client) {
        client.page.cryptomedic().authenticate('readonly');
        client.myComponentExecute('x-login-status #logout', function () { this.click(); });
        client.page.cryptomedic().authenticate('readonly');
        client.end();
    },
};
