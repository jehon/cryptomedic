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
//			console.log("get " + key);
			types[key] = typeof(def);
			if (values[key]) return angular.copy(values[key]);
			if (localStorage && localStorage[key]) {
				var it = localStorage.getItem(key);
				if (it === "" || it === "null") {
//					console.log("null detected");
					values[key] = null;
				} else {
					values[key] = objectify(it);
				}
				if (typeof(def) != types[key]) {
//					console.log("wrong type!");
					return def;
				}
				return values[key];
			}
			values[key] = def;
			return def;
		},
		'getAll': function() {
//			console.log("getAll");
			var res = {};
			var t = this;
			angular.forEach(values, function(v, k) {
				res[k] = t.get(k);
			});
//			console.log(res);
//			console.log("getAll done");
			return res;
		},
		'set': function(key, newVal) {
			var val = newVal;
			if (val === null) val = "";
//			console.info("persisting " + key + "=" + val + "[" + typeof(val) + "]");
			values[key] = val;
			if (localStorage) {
				localStorage.setItem(key, stringify(val));
			}
		}
	}
}
