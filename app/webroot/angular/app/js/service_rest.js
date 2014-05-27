"use strict";

// TODO: manage errors codes (interceptors ?)

//	$httpProvider.interceptors.push(function($q) {
//		// https://docs.angularjs.org/api/ng/service/$http
//		return {
//			'request': function(config) {
//				return config || $q.when(config);
//			},
//		
//			'response': function(response) {
//				return response || $q.when(response);
//			}
//		};
//	});

cryptoApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var cache = perishableCache(10);
	var root = "/amd";
	
	var canonize = function(data) {
		var dataCanonized = [];
		for(var i in data) {
			if (i == "Patient") {
				dataCanonized.push(data[i]);
			} else {
				for(var j in data[i]) {
					dataCanonized.push(data[i][j]);
				}
			}
		}
		return dataCanonized;
	};
	
	return {
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
			if (cache.isCached(id)) {
				console.log("having some cache data");
				return def.resolve(cache.get(id));
			}
			$http.post(root + "/patients/view/" + id + ".json")
			.success(function(data, status, headers, config) {
				var canonized = new (cryptomedic.models.Folder)({ "files": canonize(data) });
				console.log(canonized);
//				// To generate test data (! strip the trailing and ending ") 
//				console.log(JSON.stringify(canonized));
				canonized.objectizeList();
				cache.set(data['Patient']['id'], canonized);
				def.resolve(canonized);
			}).error(function(data, status, headers, config) {
				def.reject(data);
			});
			return def;
		}
	};
}]);
