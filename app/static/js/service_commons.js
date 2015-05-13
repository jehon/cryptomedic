"use strict";

mainApp.factory('cache_commons', [ function() {
	var now = new Date();
	var c = cache_storage();
	c.get("examiner", "");
	c.get("center", "");
	c.get("date", now);
	// For month: take last month
	// !! month is take from 0 in javascript, transform that
	var month = "0" + (now.getMonth());
	var year = now.getFullYear();
	if (month == "00") {
	    month = "12";
	    year = year - 1;
	}
	month = month.substring(month.length - 2);
	c.get("month", year + "-" + month);
	return c;
}]);
