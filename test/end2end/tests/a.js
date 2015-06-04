module.exports = {
	
	
	
    'reportMonthlyStatistical' : function(client) {
	client
		.page.cryptomedic().report("monthlyStatistical", { "month" : "2014-10" })
		.assert.myAssertCell("#report_table table", 2, 2, "2014-10").end();
    },
    'reportYearlyStatistical' : function(client) {
	client
		.page.cryptomedic().report("yearlyStatistical", { "year" : "2014" })
		.assert.myAssertCell("#report_table table", 2, 2, "2014").end();
    }
};
