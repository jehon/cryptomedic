"use strict";

// TODO: manage errors codes (interceptors ?)

cryptoApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var cache = perishableCache(10);
	var root = "/amd";
	
	return {
		'getCached': function(id) {
			return cache.get(id);
		},
		'checkLogin': function() {
			var def = jQuery.Deferred();
			$http.post(root + "/users/settings.json")
			.success(function(data, status, headers, config) {
				def.resolve();
			}).error(function(data, status, headers, config) {
				def.reject(data);
			});
			return def;
		},
		'doLogin': function(username, password) {
			// Hack: if no username is given, then checkLogin instead
			if (username == "") return this.checkLogin();
			
			var def = jQuery.Deferred();
			$http.post(root + "/users/login.json", { 'username': username, 'password': password })
				.success(function(data, status, headers, config) {
					def.resolve();
				}).error(function(data, status, headers, config) {
					def.reject(data);
				});
			return def;
		},
		'doLogout': function() {
			var def = jQuery.Deferred();
			$http.post(root + "/users/logout")
				.success(function(data, status, headers, config) {
					def.resolve();
				}).error(function(data, status, headers, config) {
					def.reject(data);
				});
			return def;
		},
		'checkReference': function(year, order) {
			var def = jQuery.Deferred();
			$http.post(root + "/patients/index.json", { 'Patient': {'entryyear': year, 'entryorder': order}})
			.success(function(data, status, headers, config) {
				if (data.length == 1) {
					def.resolve(data[0]['Patient']['id']);
				} else {
					def.resolve(false);
				}
			}).error(function(data, status, headers, config) {
				def.reject(data);
			});
			return def;
		},
		'getFile': function(id) {
			var def = jQuery.Deferred();
			// if (cache.isCached(id)) {
			// 	console.log("using cached informations");
			// 	return def.resolve(cache.get(id));
			// }
			$http.post(root + "/patients/folder/" + id + ".json")
			.success(function(folder, status, headers, config) {
				// cache.set(folder.getMainFile().id, folder);
				console.log(folder);
				def.resolve(folder);
			}).error(function(data, status, headers, config) {
				def.reject(data);
			});
			return def;
		},
		'searchForPatients': function(params) {
			console.log(params);
			var def = jQuery.Deferred();
			$http.post(root + "/patients/index.json", { 'Patient': params })
			.success(function(data, status, headers, config) {
				var list = [];
				for(var i in data) {
					list.push(new cryptomedic.models.Patient(data[i]['Patient']));
				}
				def.resolve(list);
			}).error(function(data, status, headers, config) {
				def.reject(data);
			});
			return def;
		}
	};
}]);
