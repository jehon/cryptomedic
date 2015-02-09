"use strict";

//	https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

function perishableCache(perish) {
	var cache = {};
	var timestamps = {};

	function perish(id) {
		delete(cache[id]);
		delete(timestamps[id]);
	}

	function checkId(id) {
		if (!perish) return;
		var lim = new Date();
		lim.setMinutes(lim.getMinutes() - 1);
		if (timestamps[id] < lim) {
			perish(id);
		}
	}

	return {
		'perish': perish,
		'isCached': function (id) {
			checkId(id);
			return (typeof(cache[id]) != "undefined");
		},
		'get': function(id) {
			if (this.isCached(id)) {
				return angular.copy(cache[id]);
			}
			return null;
		},
		'set': function(id, data) {
			cache[id] = angular.copy(data);
			timestamps[id] = new Date();
			return data;
		},
		'clear': function() {
		    cache = {};
		    timestamps = {};
		}
	};
};
