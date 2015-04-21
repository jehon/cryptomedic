"use strict";

// TODO: use -> new Promise()

function cache_storage(onReady) {
    var values = {};
    var defaults = {};
    var types = {};

    if (typeof(onReady) == 'function') {
	onReady();
    }
    
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
	    if (val === null || typeof(val) == 'undefined') {
		val = "";
	    }
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
