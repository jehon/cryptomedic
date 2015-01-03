"use strict";

mainApp.factory('cache_commons', [ function() {
	var now = new Date();
	var c = cache();
	c.get("examiner", "");
	c.get("center", 992);
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
 
function cache() {
	var values = {};
	var defaults = {};
	var types = {};

	return {
		'get': function(key, def) {
			types[key] = typeof(def);
			if (values[key]) return angular.copy(values[key]);
			if (sessionStorage && sessionStorage[key]) {
				var it = sessionStorage.getItem(key);
				if (it === "null") {
					values[key] = null;
				} else {
					values[key] = objectify(it);
				}
				if (typeof(def) != types[key]) {
					return def;
				}
				return values[key];
			}
			values[key] = def;
			return def;
		},
		'getAll': function() {
			var res = {};
			var t = this;
			angular.forEach(values, function(v, k) {
				if (typeof(t.get(k)) == "undefined") {
					res[k] = null;
				} else { 
					res[k] = t.get(k);
				}
			});
			return res;
		},
		'set': function(key, newVal) {
			var val = newVal;
			if (val === null || typeof(val) == 'undefined') val = "";
			values[key] = val;
			if (sessionStorage) {
				sessionStorage.setItem(key, stringify(val));
			}
		},
		'clear': function() {
			values = {};
			if (sessionStorage) {
				sessionStorage.clear();
			}
		}
	}
}
