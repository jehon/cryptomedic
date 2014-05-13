cryptoApp.factory('service_rest', [ '$http', '$log' , function($http, $log) {
	var loggedIn = false;

	//factory function body that constructs shinyNewServiceInstance
	return {
		'isLoggedIn': function() {
			return loggedIn;
		},
		'doLogin': function(username, password) {
			var def = jQuery.Deferred();
			if (loggedIn) {
				def.resolve();
			};
			loggedIn = true;
			def.resolve();
			return def;
		},
		'doLogout': function() {
			var def = jQuery.Deferred();
			if (!loggedIn) {
				def.resolve();
			};
			loggedIn = false;
			def.resolve();
			return def;
		},
	};
}]);