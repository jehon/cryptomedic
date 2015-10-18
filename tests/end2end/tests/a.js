module.exports = {
	'searchPatient2000': function(client) {
	    client
	    	.page.cryptomedic().authenticate("readonly") 
	    	.myClick("#menu_search")
	    	.waitForElementPresent(".searchFields", 1000)
	    	.setValue("#Patient_entryyear", 2000)
	    	.myClick("#button_submit")
	    	.waitForElementPresent("#search_results", 1000)
	    	.assert.myAssertTableCountRows("#search_results", 2)
	    	.myClick("#search_results tbody tr:nth-child(1) td:nth-child(1) img")
	    	.assert.myAssertHashIs("#/folder/10/patient")
	    	.pause(10000)
	    	.end();
	},
	
//    'reportMonthlyStatistical' : function(client) {
//	client
//		.page.cryptomedic().authenticate("readonly")
//		.page.cryptomedic().report("monthlyStatistical", { "month" : "2014-10" })
//		.assert.myAssertCell("#report_table table", 2, 2, "2014-10")
//		.end();
//    },
//    'reportYearlyStatistical' : function(client) {
//	client
//		.page.cryptomedic().authenticate("readonly")
//		.page.cryptomedic().report("yearlyStatistical", { "year" : "2014" })
//		.assert.myAssertCell("#report_table table", 2, 2, "2014").end();
//    }
};
