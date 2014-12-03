"use strict";

mainApp.factory('cache_commons', [ function() {
	var now = new Date();
	var c = cache();
	c.get("examinerName", "");
	c.get("center", 992);
	c.get("date", now);
	c.get("month", now.getFullYear() + "-" + now.getMonth());
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
			if (localStorage && localStorage[key]) {
				var it = localStorage.getItem(key);
				if (it === "" || it === "null") {
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
				res[k] = t.get(k);
			});
			return res;
		},
		'set': function(key, newVal) {
			var val = newVal;
			if (val === null) val = "";
			values[key] = val;
			if (localStorage) {
				localStorage.setItem(key, stringify(val));
			}
		},
		'clear': function() {
			values = {};
			if (localStorage) {
				localStorage.clear();
			}
		}
	}
}
