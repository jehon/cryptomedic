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
				data = treatResponse(data);
			}
			def.resolve(data);
		}).error(function(data, status, headers, config) {
			if (status == 403 || status == 404) {
				// 401: Unauthorized
				// 403: Forbidden
				$rootScope.$broadcast("rest_logged_out");
			} else {
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
		'saveFile': function(data) {
			// TODO
			if (data['_type'] == "Patient") {
				cache.perish(data['id']);
			} else {
				cache.perish(data['patient_id']);
			}
			return treatHttp($http.post(root + "/" + data['_type'] + "/save/" + data['id'], data), function(data) {
				// TODO here
			});
		}
	};
}]);
