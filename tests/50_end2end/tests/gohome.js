module.exports = {
	  "tags": [ "readonly" ],
	  "homepage": function (client) {
	      client
	    	.page.cryptomedic().authenticate("readonly")
	    	.end();
	}
};
