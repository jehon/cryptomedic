module.exports = {
	'tags': [ 'readonly', 'reports' ],
	'reportConsultation': function(client) {
	    client
	    	.page.cryptomedic().authenticate("readonly")
	    	.page.cryptomedic().report("consultations", { "day": "2015-04-28" })
		.assert.myAssertCell("#report_table table", 1, 1, "appointment")
		.assert.myAssertCell("=", "=", 2, "Chakaria")
		.assert.myAssertCell("=", "=", 3, "2001-1")
		.end();
	}
}
