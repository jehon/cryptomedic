module.exports = {
  "wrong_password": function(client) {
    client
      .page.cryptomedic().authenticate_fillIn("user_that_does_not_exists_at_all")
      .waitForElementPresent("#login_error");
  },

  "authenticate_multiple": function(client) {
    client
      .page.cryptomedic().authenticate("readonly")
      .myClick("#logout")
      .waitForElementNotVisible("#logout")
      .page.cryptomedic().authenticate("readonly")
      .end();
  },
};
