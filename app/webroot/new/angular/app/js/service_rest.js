"use strict";

// TODO: manage errors codes (interceptors ?)

mainApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var cache = perishableCache(10);
	var root = "/amd/new/rest/";
	
	function treatHttp(request, treatResponse) {
		var def = jQuery.Deferred();

		request.success(function(data, status, headers, config) {
			$rootScope.$broadcast("rest_logged_in");
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
				alert("rest error: " + status + "\n" + data.replace(/<(?:.|\n)*?>/gm, ''));
				$rootScope.$broadcast("rest_error");
			}
			def.reject(data);
		});
		return def;
	}

	return {
		'checkLogin': function() {
			return treatHttp($http.get(root + "/authenticate/settings"));
		},
		'doLogin': function(username, password) {
			// Hack: if no username is given, then checkLogin instead
			if (username == "") return this.checkLogin();
			return treatHttp($http.post(root + "/authenticate/login", { 'username': username, 'password': password }));
		},
		'doLogout': function() {
			return treatHttp($http.get(root + "/authenticate/logout"), function(data) {
				$rootScope.$broadcast("rest_logged_out");
			});
		},
		'searchForPatients': function(params) {
			return treatHttp($http.get(root + "/folders/", { 'params': params }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new cryptomedic.models.Patient(data[i]));
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
		'getFolder': function(id) {
			if (cache.isCached(id)) {
				return jQuery.Deferred().resolve(cache.get(id));
			}
			return treatHttp($http.get(root + "/folders/" + id), function(data) {
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'unlockFile': function(data, folderId) {
			cache.perish(folderId);
		    return treatHttp($http({ method: "UNLINK", url: root + "/file/" + data['_type'] + "/" + data['id'] }), function(data) {
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'saveFile': function(data, folderId) {
			cache.perish(folderId);
			return treatHttp($http.put(root + "/file/" + data['_type'] + "/" + data['id'], data), function(data) {
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'createFile': function(data, folderId) {
			cache.perish(folderId);
			return treatHttp($http.post(root + "/file/" + data['_type'], data), function(data, status, headers, config) {
				// Access to headers???
				// headers("NEWKEY");
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'deleteFile': function(data, folderId) {
			cache.perish(folderId);
		    return treatHttp($http.delete(root + "/file/" + data['_type'] + "/" + data['id']), function(data) {
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},

	};
}]);
