module.exports = {
  'homepage': function (client) {
      client
	.page.cryptomedic().authenticate("readonly")
	.end();
  }
};
