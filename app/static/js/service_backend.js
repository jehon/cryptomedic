"use strict";

// TODOJH: manage errors codes (interceptors ?)

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
	// TOODJH: Hook it to indexeddb
	var pcache = perishableCache(10);
	var root = "/rest/";
	
	function treatHttp(request, treatResponse) {
		var def = jQuery.Deferred();
		request.success(function(data, status, headers, config) {
			$rootScope.$broadcast("rest_logged_in");
			
			// TODOJH: filter and treat __sync data
			
			if (typeof(treatResponse) == 'function') {
				data = treatResponse(data, status, headers, config);
			}
			def.resolve(data);
		}).error(function(data, status, headers, config) {
			if (status == 401) {
				// 401: Unauthorized
				$rootScope.$broadcast("rest_logged_out");
			} else {
				// 403: Forbidden
				//alert("rest error: " + status + "\n" + data.replace(/<(?:.|\n)*?>/gm, ''));
				$rootScope.$broadcast("rest_error");
			}
			def.reject(data);
		});
		return def;
	}

	return {
		'checkLogin': function() {
			// TODOJH: Give him information about last sync
			return treatHttp($http.get(root + "/authenticate/settings"));
		},
		'doLogin': function(username, password) {
			// Hack: if no username is given, then checkLogin instead
			if (username == "") return this.checkLogin();
			return treatHttp($http.post(root + "/authenticate/login", { 'username': username, 'password': password }));
		},
		'doLogout': function() {
			cache().clear();
			return treatHttp($http.get(root + "/authenticate/logout"), function(data) {
				$rootScope.$broadcast("rest_logged_out");
			});
		},
		'getFolder': function(id) {
			if (pcache.isCached(id)) {
				return jQuery.Deferred().resolve(pcache.get(id));
			}
			return treatHttp($http.get(root + "/folders/" + id), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'getParent': function(type, id) {
			return treatHttp($http.get(root + "/related/" + type + "/" + id), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},

		'searchForPatients': function(params) {
			return treatHttp($http.get(root + "/folders/", { 'params': params }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new application.models.Patient(data[i]));
				}
				return list;
			});
		},
		'searchForConsultations': function(day, center) {
			day = date2CanonicString(day, true);
			return treatHttp($http.get(root + "/consultations/", { 'params': { 'day': day, 'center': center} }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new application.models.Patient(data[i]));
				}
				return list;
			});
		},
		'checkReference': function(year, order) {
			return treatHttp($http.get(root + "/references/", 
					{ 'params': { 
						'entryyear': year, 
						'entryorder': order
					}}), 
				function(data) {
					if (data.length == 1) {
						return data[0]['id'];
					} else {
						return false;
					}
				});
		},
		'createReference': function(year, order) {
			return treatHttp($http.post(root + "/references/", 
					{ 
						'entryyear': year, 
						'entryorder': order
					}), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;
			}); 
		},
		'unlockFile': function(data, folderId) {
			pcache.perish(folderId);
		    return treatHttp($http({ method: "UNLINK", url: root + "/fiche/" + data['_type'] + "/" + data['id'] }), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'saveFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.put(root + "/fiche/" + data['_type'] + "/" + data['id'], data), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'createFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.post(root + "/fiche/" + data['_type'], data), function(data, status, headers, config) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'deleteFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.delete(root + "/fiche/" + data['_type'] + "/" + data['id']), function(data) {
				if (data instanceof application.models.Folder)
					pcache.set(data.getMainFile().id, data);
				return data;				
			});
		}
	};
}]);
