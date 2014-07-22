"use strict";

// TODO: manage errors codes (interceptors ?)

cryptoApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var cache = perishableCache(10);
	var root = "/amd/rest/";
	
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
		// 'getCached': function(id) {
		// 	return cache.get(id);
		// },
		'checkLogin': function() {
			return treatHttp($http.post(root + "/authenticate/settings"));
		},
		'doLogin': function(username, password) {
			// Hack: if no username is given, then checkLogin instead
			if (username == "") return this.checkLogin();
			return treatHttp($http.post(root + "/authenticate/login", { 'username': username, 'password': password }));
		},
		'doLogout': function() {
			return treatHttp($http.post(root + "/authenticate/logout"), function(data) {
				$rootScope.$broadcast("rest_logged_out");
			});
		},
		'searchForPatients': function(params) {
			// TODO
			return treatHttp($http.post(root + "/patients/", { 'Patient': params }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new cryptomedic.models.Patient(data[i]['Patient']));
				}
				return list;
			});
		},
		'checkReference': function(year, order) {
			// TODO
			return treatHttp($http.post(root + "/patients/", { 'Patient': {'entryyear': year, 'entryorder': order}}), 
				function(data) {
					if (data.length == 1) {
						return data[0]['Patient']['id'];
					} else {
						return false;
					}
				});
		},
		'getFolder': function(id) {
			if (cache.isCached(id)) {
				console.log("using cached informations");
				var def = jQuery.Deferred();
				return def.resolve(cache.get(id));
			}
			return treatHttp($http.get(root + "/folders/" + id), function(data) {
				cache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'saveFile': function(data) {
			// TODO
			if (data['type'] == "Patient") {
				cache.perish(data['id']);
			} else {
				cache.perish(data['patient_id']);
			}
			return treatHttp($http.post(root + "/" + data['controller'] + "/save/" + data['id'] + ".json", data), function(data) {
				// TODO here
			});
		}
	};
}]);
