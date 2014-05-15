"use strict";

cryptoApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var root = "/amd";
//	checkLogin();
	
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
	};
}]);