module.exports = {
  'Test': function (client) {
    client
	.page.homepage().authenticate()
	.assert.title('Cryptomedic')
	.saveScreenshot("test.png")
	.end();
  }
};

