module.exports = {
  'reportConsultation': function(client) {
      client.page.cryptomedic().report("consultations", { "day": "2015-04-26" })
	.assert.containsText("#report_table table tbody tr:nth-child(1) td:nth-child(2)", "Chakaria")
	.assert.containsText("#report_table table tbody tr:nth-child(1) td:nth-child(3)", "2013-653")
	//.myAssertCellContain("#report_table table", 1, 3, "2013-653")
	.assert.myAssertCell("#report_table table", 1, 3, "2013-653")
	.end();
  }
};
