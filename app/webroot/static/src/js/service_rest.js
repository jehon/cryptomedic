cryptoApp.factory('service_rest', [ '$http', '$log' , function($http, $log) {
	var loggedIn = false;

	//factory function body that constructs shinyNewServiceInstance
	return {
		'isLoggedIn': function() {
			return loggedIn;
		},
		'doLogin': function() {
			loggedIn = true;
		},
		'doLogout': function() {
			loggedIn = false;
		},
	};
}]);