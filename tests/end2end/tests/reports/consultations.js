module.exports = {
	'tags': [ 'readonly', 'reports' ],
	'reportConsultation': function(client) {
	    client
	    	.page.cryptomedic().authenticate("readonly")
	    	.page.cryptomedic().report("consultations", { "day": "2014-12-31" })
		.assert.myAssertCell("#report_table table", 1, 1, "clubfoot")
		.assert.myAssertCell("=", "=", 2, "Chakaria")
		.assert.myAssertCell("=", "=", 3, "2014-80095")
		.end();
	}
}
