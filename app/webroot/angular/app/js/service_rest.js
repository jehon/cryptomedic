"use strict";

cryptoApp.factory('service_rest', [ '$http', '$log' , '$rootScope', function($http, $log, $rootScope) {
	var root = "/amd";
	var loggedIn = false;
	return {
		'isLoggedIn': function() {
			return loggedIn;
		},
		'doLogin': function(username, password) {
			var def = jQuery.Deferred();
			$http.post(root + "/users/login.json", { 'username': username, 'password': password })
				.success(function(data, status, headers, config) {
					loggedIn = true;
					$rootScope.$broadcast("login");
					$rootScope.$broadcast("clear");
					def.resolve();
				}).error(function(data, status, headers, config) {
					loggedIn = false;
					$rootScope.$broadcast("logout");
					def.reject(data);
				})
			return def;
		},
		'doLogout': function() {
			var def = jQuery.Deferred();
			if (!loggedIn) {
				def.resolve();
			};
			loggedIn = false;
			$rootScope.$broadcast("logout");
			def.resolve();
			return def;
		},
	};
}]);