"use strict";

mainApp.factory('cache_commons', [ function() {
	var now = new Date();
	// For month/year: take last month/the year of last month
	// !! month is take from 0 in javascript, transform that

	var year = now.getFullYear();
//	if (month == "00") {
//	    month = "12";
//	    year = year - 1;
//	}

	var month = "0" + (now.getMonth() + 1);
	month = month.substring(month.length - 2);

	var c = cache_storage();
	c.get("examiner", "");
	c.get("center", "");
	c.get("day", now);
	c.get("month", year + "-" + month);
	c.get("year", year);
	return c;
}]);
