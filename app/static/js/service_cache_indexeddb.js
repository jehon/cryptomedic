"use strict";

/*
 * Some sevices are always done online: reports, ... 
 * --> check first that nothing is left in the cache
 * 
 */

// use new Promise();

function cache_indexeddb(onReady) {
//    if (!indexedDB) {
//	console.info("No indexed db - going to fallback service_rest");
//	return cache_storage(onReady);
//    }
	
    var error = function(event) {
	console.error(event.target);
    };
	
    var db = false;
	
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
     
     return {
	 'get': function(id, def) {
	     
	 },
	 'getAll': function() {
	     
	 },
	 'set': function(id, value) {
	     
	 },
	 'clear': function() {
	     
	 }
     }
};
