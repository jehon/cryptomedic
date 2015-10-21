module.exports = {
	'tags': [ 'readonly', 'reports' ],
	'reportMonthlyActivity': function(client) {
            client
            	.page.cryptomedic().authenticate("readonly")
            	.page.cryptomedic().report("monthlyActivity", { "month": "2014-05" })
            	.assert.myAssertCell("#report_table table", 1, 2, "2014-05")
            	.assert.myAssertCell("Rezaul")
            	.assert.myAssertCell("Moeshkali")
            	.assert.myAssertCell("2014-103")
            	.assert.myAssertCell("OSMAN")
            	.assert.myAssertCell("6")
            	.assert.myAssertCell("Male")
            	.assert.myAssertCell("Old")
            	.assert.myAssertCell("4500")
            	.assert.myAssertCell("9")
            	.assert.myAssertCell("500")
            	.assert.myAssertCell("2")
            	.assert.myAssertCell("CF")
            	.assert.myAssertCell("CsP")
            	.assert.myAssertCell("")
            	.assert.myAssertCell("100")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("100")
            	.assert.myAssertCell("40")
            	.assert.myAssertCell("0")

            	.assert.myAssertCell("=", "last", 17, "400")
            	.assert.myAssertCell("=", "last", "last", "300")
            	.end();
        },

        'reportDailyActivity': function(client) {
            client
            	.page.cryptomedic().authenticate("readonly")
            	.page.cryptomedic().report("dailyActivity", { "day": "2014-05-20" })
            	.assert.myAssertCell("#report_table table", 1, 2, "2014-05-20")
            	.assert.myAssertCell("Ershad")
            	.assert.myAssertCell("Chakaria")
            	.assert.myAssertCell("2013-254")
            	.assert.myAssertCell("Md Mahamud")
            	.assert.myAssertCell("3")
            	.assert.myAssertCell("Male")
            	.assert.myAssertCell("Old")
            	.assert.myAssertCell("10000")
            	.assert.myAssertCell("12")
            	.assert.myAssertCell("833")
            	.assert.myAssertCell("3")
            	.assert.myAssertCell("CF")
            	.assert.myAssertCell("CsP")
            	.assert.myAssertCell("")
            	.assert.myAssertCell("100")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("0")
            	.assert.myAssertCell("100")
            	.assert.myAssertCell("70")
            	.assert.myAssertCell("0")

            	.assert.myAssertCell("=", "last", 17, "3800")
            	.assert.myAssertCell("=", "last", "last", "1130")
            	.end();
        }
};
