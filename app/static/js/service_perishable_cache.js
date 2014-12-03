"use strict";

//	https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

function perishableCache(perish) {
	var error = function(event) {
		console.error(event.target);
	};
	
	var db = false;
	
	if (indexedDB) {
		var request = indexedDB.open("cryptomedic", 1);
		request.onerror = error;
		request.onsuccess = function(event) {
			  db = event.target.result;
		};
		request.onblocked = function(event) {
			  // If some other tab is loaded with the database, then it needs to be closed
			  // before we can proceed.
			alert("Please close all other tabs with this site open!");
		};
		request.onupgradeneeded = function(event) {
			var db = event.target.result;
			var v = event.oldVersion;
			console.log(event);
			console.log("upgrading from " + v);
			if (v < 1) {
				console.log("upgrading to 1");
				db.createObjectStore("patients", { keyPath: "id" });
			}
		};
	}
	
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
		}
	};
};
