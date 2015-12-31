module.exports = {
	'tags': [ 'readonly', 'reports' ],
	'reportMonthlyActivity': function(client) {
    client
    	.page.cryptomedic().authenticate("readonly")
    	.page.cryptomedic().report("monthlyActivity", { "month": "2014-05" })
        .assert.myAssertCell("#report_table table", 1, 1, "1")
      	.assert.myAssertCell("#report_table table", 3, 2, "2014-05")
        .assert.myAssertCell("Ershad")
        .assert.myAssertCell("RA") // Ramu (codage)
        .assert.myAssertCell("2014-103")
        .assert.myAssertCell("OSMAN")
        .assert.myAssertCell("5y4m")
        .assert.myAssertCell("Male")
        .assert.myAssertCell("Old")
        .assert.myAssertCell("4500")
        .assert.myAssertCell("9")
        .assert.myAssertCell("500")
        .assert.myAssertCell("2")
        .assert.myAssertCell("CF")
        .assert.myAssertCell("CsP")
        .assert.myAssertCell("Plast")
        .assert.myAssertCell("100")
        .assert.myAssertCell("0")
        .assert.myAssertCell("0")
        .assert.myAssertCell("0")
        .assert.myAssertCell("400")
        .assert.myAssertCell("500")
        .assert.myAssertCell("200")
        .assert.myAssertCell("0")

        // New / Old patient in same month
        .assert.myAssertCell("#report_table table", 4, 5, "2014-107")
        .assert.myAssertCell("#report_table table", '=', '+4', "New")
        .assert.myAssertCell("#report_table table", '+1', 5, "2014-107")
        .assert.myAssertCell("#report_table table", '=', '+4', "Old")

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
        .assert.myAssertCell("RA") // Ramu (codage)
        .assert.myAssertCell("2014-103")
        .assert.myAssertCell("OSMAN")
        .assert.myAssertCell("5y4m")
        .assert.myAssertCell("Male")
        .assert.myAssertCell("Old")
        .assert.myAssertCell("4500")
        .assert.myAssertCell("9")
        .assert.myAssertCell("500")
        .assert.myAssertCell("2")
        .assert.myAssertCell("CF")
        .assert.myAssertCell("CsP")
        .assert.myAssertCell("Plast")
        .assert.myAssertCell("100")
        .assert.myAssertCell("0")
        .assert.myAssertCell("0")
        .assert.myAssertCell("0")
        .assert.myAssertCell("400")
        .assert.myAssertCell("500")
        .assert.myAssertCell("200")
        .assert.myAssertCell("0")

      	.assert.myAssertCell("=", "last", 17, "200")
      	.assert.myAssertCell("=", "last", "last", "300")
      	.end();
  }
};
