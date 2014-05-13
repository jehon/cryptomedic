var cryptoApp = angular.module('Cryptomedic_app', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'src/html/login.html',
        controller: 'Cryptomedic_ctrl'
    })
    .when('/patients/:id', {
        templateUrl: 'src/html/patient.html',
        controller: 'Cryptomedic_ctrl'
    }).when('/home', {
    	templateurl: 'src/html/home.html',
    	controller: 'Cryptomedic_ctrl'
    })
    .otherwise({ 'redirectTo': '/home'});
}])
.config([ '$compileProvider', function( $compileProvider ) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
}]);

cryptoApp.controller('Cryptomedic_ctrl', [ '$scope', 'service_rest' , function($scope, service_rest) { 
	$scope.safeApply = function (fn) {
		  var phase = this.$root.$$phase;
		  if(phase == '$apply' || phase == '$digest') {
			  	if(fn && (typeof(fn) === 'function')) {
		    		fn();
		    	}
		  } else {
			  this.$apply(fn);
		  }
	};
	
	function tryApply() {
		try {
			$scope.$apply();
		} catch (e) {}
	}
	
	$scope.loggedIn = service_rest.isLoggedIn();
	$scope.login = function() {
			service_rest.doLogin().done(function() {
				console.log("main logged in");
				$scope.safeApply();
				$scope.loggedIn = service_rest.isLoggedIn();
			});
	};
}]);
