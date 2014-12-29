"use strict";

/*
 * expected behavior:
 * - always store what come back from the server in the cache
 * - if offline, this data does not perish
 * - if online, this data perish (see checkId which manage that)
 * 
 * Expected from the server:
 * - if offline, the list of modifications since last time
 * - if online, nothing special
 *
 * Tasks:
 * 1. make this cache async in its calls (return promise)
 * 2. manage the fallback mode: when no indexedDB are available (!db)
 * 3. enrich when receiving data from the server and get from the indexedDB
 * 
 */

mainApp.factory('service_backend', [ '$http', '$rootScope', function($http, $rootScope) {
	var rest;
	if (cryptomedic.settings.offlineCache) {
		console.warn("Using service_indexeddb");
		rest = service_rest($http);
	} else {
		rest = service_rest($http);
	}

	rest.onLogin.add(function() {
		$rootScope.$broadcast("rest_logged_in");
	});
	
	rest.onLogout.add(function() {
		$rootScope.$broadcast("rest_logged_out");
	});

	rest.onError.add(function() {
		$rootScope.$broadcast("rest_error");
		//alert("rest error: " + status + "\n" + data.replace(/<(?:.|\n)*?>/gm, ''));
	});
	
	return rest;
}]);
